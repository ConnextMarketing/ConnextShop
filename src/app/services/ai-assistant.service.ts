import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import OpenAI from 'openai';

interface Message {
  id: number; // UNIX timestamp
  role: 'user' | 'system';
  content: string | null;
}

interface Topic {
  term: string; // The unique id and primary key
  relatedMessages: number[]; // List of UNIX timestamps from messages
}

@Injectable({
  providedIn: 'root',
})
export class AiAssistantService extends Dexie {
  messages!: Table<Message, number>;
  topics!: Table<Topic, string>;
  op = {
    organization: 'org-',
    project: 'proj_',
  }
  private openai: OpenAI;
  private reservedTokens = 300;

  constructor() {
    super('AiAssistantDatabase');

    this.version(1).stores({
      messages: '++id, role, content',
      topics: 'term, relatedMessages',
    });

    this.openai = new OpenAI({
      organization: this.op["organization"],
      project: this.op["project"],
    });

    // Ensure tables are initialized
    this.messages = this.table('messages');
    this.topics = this.table('topics');
  }

  // Calculate max tokens considering the context size
  private calculateMaxTokens(modelName: string, contextSize: number): number {
    const modelMaxTokens: { [key: string]: number } = {
      'gpt-3.5-turbo': 4096,
      'gpt-3.5-turbo-16k': 16384,
      'gpt-4': 8192,
      'gpt-4-32k': 32768,
      'gpt-4-turbo': 128000,
    };

    const maxTokens = modelMaxTokens[modelName] || 4096;
    const completionTokens = 4096;

    // Adjust contextSize if too large
    const adjustedContextSize = Math.min(contextSize, maxTokens - completionTokens);

    return Math.min(maxTokens - adjustedContextSize, completionTokens) - this.reservedTokens;
  }

  // Method to handle large context by splitting and concatenating responses
  async getFullResponse(prompt: string, modelName: string = 'gpt-4-turbo'): Promise<any> {
    const context = await this.buildMessageHistory(prompt);
    const contextSize = context.reduce((acc, msg) => acc + (msg.content?.length || 0), 0);
    const maxTokens = this.calculateMaxTokens(modelName, contextSize);

    let fullResponse = '';
    let parts: string[] = [];

    let response = await this.getResponseChunk(context, modelName, maxTokens);
    while (response) {
      parts.push(response);
      fullResponse += response;

      context.push({ role: 'system', content: response });
      const newContextSize = context.reduce((acc, msg) => acc + (msg.content?.length || 0), 0);
      const remainingTokens = this.calculateMaxTokens(modelName, newContextSize);
      response = remainingTokens > 0 ? await this.getResponseChunk(context, modelName, remainingTokens) : null;
    }

    return this.formatResponse(fullResponse, parts);
  }

  // Helper method to get a single chunk of response
  private async getResponseChunk(context: any[], modelName: string, maxTokens: number): Promise<string | null> {
    try {
      const response = await this.openai.chat.completions.create({
        model: modelName,
        messages: context,
        max_tokens: maxTokens,
        temperature: 0.7,
      });

      return response.choices[0]?.message?.content || null;
    } catch (error) {
      console.error('Error fetching response chunk:', error);
      return null;
    }
  }

  // Format the full response in different formats
  private formatResponse(fullResponse: string, parts: string[]): any {
    return {
      plainText: fullResponse,
      json: { parts: parts.map((part, index) => ({ partNumber: index + 1, content: part })) },
      html: this.convertToHtml(parts),
    };
  }

  // Convert parts to HTML format
  private convertToHtml(parts: string[]): string {
    return parts.map(part => `<p>${part}</p>`).join('');
  }

  // Asynchronous message history builder
  async buildMessageHistory(prompt: string): Promise<any[]> {
    const history: any[] = [];

    await this.messages.each((message) => {
      if (message.content) {
        history.push({ role: message.role, content: message.content });
      }
    });

    history.push({ role: 'user', content: prompt });
    return history;
  }
}
