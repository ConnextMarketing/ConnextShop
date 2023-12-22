import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LangService  } from '../services/lang.service';
import { LangConfig } from '../interfaces/lang-config';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.page.html',
  styleUrls: ['./portfolio.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  providers: [LangService]
})
export class PortfolioPage implements OnInit {

  langConfig!: LangConfig;
  currentLanguage: string = 'eng'; // this could be dynamically set
  
  constructor(
    private langService: LangService,
    private changeDetectorRef: ChangeDetectorRef
    ) { }

  ngOnInit() {
    this.langService.getEnvironment().subscribe(
  config => {
    this.langConfig = config;

    // Ensure that the properties exist in langConfig before accessing them
    const getTranslation = (key: string) => this.langConfig[key] ? this.langConfig[key][this.currentLanguage] : 'Unknown';

  
    this.title = getPageTitle('portfolio');
    
  },
  error => {
    // Handle the error and alert the error message
    this.changeDetectorRef.detectChanges();
    alert('Error: ' + error.message);
  }
);

  }

}
