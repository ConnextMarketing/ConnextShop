import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AiAssistantService {

  private openAiApiUrl = 'https://api.openai.com/v1/chat/completions';
  private awsBedrockApiUrl = 'https://bedrock.amazonaws.com/v1/models/claude3/invocations';
  private sentimentAnalysisUrl = 'https://api.example.com/sentiment'; // Replace with actual sentiment analysis API
  private crmApiUrl = 'https://crm.example.com/customer-data'; // Replace with actual CRM API
  private maxTokens = 4096; // Adjust according to the specific model's token limit
  private reservedTokens = 300;

  constructor(private http: HttpClient) {}

  getOpenAiResponse(prompt: string, imageData?: Blob): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer YOUR_OPENAI_API_KEY`
    });

    const formData = new FormData();
    formData.append('model', 'gpt-4');
    formData.append('messages', JSON.stringify(this.buildMessageHistory(prompt)));
    if (imageData) {
      formData.append('image', imageData, 'screenshot.png');
    }

    return this.http.post(this.openAiApiUrl, formData, { headers });
  }

  getAwsBedrockResponse(prompt: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer YOUR_AWS_BEDROCK_API_KEY`
    });

    const body = {
      inputText: prompt,
      modelParameters: {
        maxTokens: this.maxTokens - this.reservedTokens,
        temperature: 0.7
      }
    };

    return this.http.post(this.awsBedrockApiUrl, body, { headers: headers });
  }

  getSentimentAnalysis(text: string): Observable<any> {
    const body = { text };
    return this.http.post(this.sentimentAnalysisUrl, body);
  }

  getCustomerData(customerId: string): Observable<any> {
    return this.http.get(`${this.crmApiUrl}/${customerId}`);
  }

  callApis(prompt: string, customerId: string): void {
    this.getSentimentAnalysis(prompt).subscribe(sentiment => {
      const sentimentScore = sentiment.score;

      if (this.checkForPastReferences(prompt)) {
        const pastConversations = this.retrieveRelevantConversations(prompt);
        const updatedPrompt = this.addPastConversationsToContext(prompt, pastConversations);
        this.processApiCalls(updatedPrompt, customerId, sentimentScore);
      } else {
        this.processApiCalls(prompt, customerId, sentimentScore);
      }
    });
  }

  processApiCalls(prompt: string, customerId: string, sentimentScore: number): void {
    this.getCustomerData(customerId).subscribe(customerData => {
      const personalizedPrompt = this.addPersonalization(prompt, customerData);

      this.getOpenAiResponse(personalizedPrompt).subscribe(response => {
        this.handleApiResponse('OpenAI', response, sentimentScore);
      });

      this.getAwsBedrockResponse(personalizedPrompt).subscribe(response => {
        this.handleApiResponse('AWS Bedrock', response, sentimentScore);
      });
    });
  }

  handleApiResponse(source: string, response: any, sentimentScore: number): void {
    const messageContent = source === 'OpenAI' ? response.choices[0].message.content : response.completion;

    this.updateConversationContext('Assistant', messageContent);

    if (sentimentScore < 0.5) {
      this.escalateToHumanAgent(messageContent);
    } else {
      console.log(`${source} Response:`, messageContent);
    }

    this.logInteraction(source, messageContent, sentimentScore);
  }

  addPersonalization(prompt: string, customerData: any): string {
    const personalizedMessage = `Hello ${customerData.name}, based on your recent interactions, here’s what we have for you: `;
    return `${personalizedMessage}\n${prompt}`;
  }

  logInteraction(source: string, content: string, sentimentScore: number): void {
    const interactionLog = {
      source,
      content,
      sentimentScore,
      timestamp: new Date().toISOString()
    };
    // Add logic to store this interaction in a database or analytics platform
  }

  escalateToHumanAgent(content: string): void {
    console.log('Escalating to a human agent due to low sentiment score:', content);
    // Implement escalation logic, e.g., send to live chat agent
  }

  checkForPastReferences(prompt: string): boolean {
    return /remember|specific topic/.test(prompt.toLowerCase());
  }

  retrieveRelevantConversations(prompt: string): any[] {
    const storedConversations = this.loadConversationHistory();
    const relevantConversations = storedConversations.filter(convo => convo.content.includes(prompt));
    return relevantConversations;
  }

  addPastConversationsToContext(prompt: string, pastConversations: any[]): string {
    let updatedPrompt = prompt;
    pastConversations.forEach(convo => {
      const timestamp = new Date(parseInt(convo.timestamp, 10)).toLocaleString();
      updatedPrompt += `\n\n(Note: The following message was from a past conversation on ${timestamp}): ${convo.content}`;
    });
    return updatedPrompt;
  }

  buildMessageHistory(prompt: string): any[] {
    const history = this.loadConversationHistory();
    history.push({ role: 'user', content: prompt });
    return history.map(entry => ({
      role: entry.role,
      content: entry.content
    }));
  }

  loadConversationHistory(): any[] {
    const history = localStorage.getItem('conversationHistory');
    return history ? JSON.parse(history) : [];
  }

  updateConversationContext(role: string, message: string): void {
    const history = this.loadConversationHistory();
    const timestamp = Date.now().toString();
    history.push({ role, content: message, timestamp });
    
    while (this.calculateTokenCount(history) > this.maxTokens - this.reservedTokens) {
      history.shift(); // Remove the oldest messages if over the limit
    }
    
    localStorage.setItem('conversationHistory', JSON.stringify(history));
  }

  calculateTokenCount(messages: any[]): number {
    return messages.reduce((count, message) => count + this.tokenize(message.content), 0);
  }

  tokenize(text: string): number {
    return text.split(' ').length;
  }

  loadConversationContext(): void {
    const summary = localStorage.getItem('conversationSummary');
    const facts = localStorage.getItem('importantFacts');
    console.log('Loaded summary:', summary);
    console.log('Loaded important facts:', facts);
  }
}