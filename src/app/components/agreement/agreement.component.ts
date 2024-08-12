import { Component } from '@angular/core';
import * as AWS from 'aws-sdk';

@Component({
  selector: 'app-agreement',
  templateUrl: './agreement.component.html',
  styleUrls: ['./agreement.component.scss'],
  standalone: true,
})
export class AgreementComponent {
  userName = ''; // Bind to form input for user's name
  date = new Date().toLocaleDateString(); // Current date

  // Default Polly settings
  selectedLanguage = 'en-US';
  selectedVoice = 'Joanna';
  polly: AWS.Polly;

  constructor() {
    AWS.config.update({
      region: 'us-east-1', // Replace with your AWS region
      accessKeyId: '', // Replace with your AWS Access Key
      secretAccessKey: '' // Replace with your AWS Secret Key
    });
    this.polly = new AWS.Polly();
  }

  // Method to synthesize speech using AWS Polly
  readAgreementText() {
    const text = document.querySelector('.agreement-text').textContent;

    const params = {
      OutputFormat: 'mp3',
      Text: text,
      VoiceId: this.selectedVoice,
      LanguageCode: this.selectedLanguage,
    };

    this.polly.synthesizeSpeech(params, (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      if (data && data.AudioStream instanceof Buffer) {
        const audio = new Audio(URL.createObjectURL(new Blob([data.AudioStream])));
        audio.play();
      }
    });
  }

  acceptAgreement() {
    // Logic for handling agreement acceptance
    console.log('Agreement accepted by:', this.userName);
    // Perform any necessary actions like routing or API calls
  }
}