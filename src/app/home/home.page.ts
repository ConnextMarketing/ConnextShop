import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IonApp, IonRouterOutlet, IonHeader, IonToolbar, IonButton, IonTitle, IonMenuButton, IonButtons, IonMenu, IonContent, IonList, IonItem } from '@ionic/angular/standalone';
import { LangService  } from '../services/lang.service';
import { LangConfig } from '../interfaces/lang-config';

import { addIcons } from 'ionicons';
import { mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp, bookOutline, bookSharp, briefcaseOutline, buildOutline, codeSlashOutline, codeSlashSharp, colorPaletteOutline, colorPaletteSharp, chatbubblesOutline, chatbubblesSharp, scanCircle, backspace, refreshCircle, closeCircleOutline, addCircleOutline, newspaperOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  providers: [LangService]
})
export class HomePage implements OnInit {
  
  public title!: string;
  public tagline!: string;
  public taglineDescription!: string;
  public portfolio!: string;
  public blog!: string;
  public services!: string;
  
  constructor(
    private langService: LangService,
    private changeDetectorRef: ChangeDetectorRef 
    ) { 
    
    addIcons({ chatbubblesOutline, chatbubblesSharp, colorPaletteOutline, colorPaletteSharp, paperPlaneOutline, bookOutline, bookSharp, briefcaseOutline, codeSlashOutline, codeSlashSharp, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp, scanCircle, backspace, refreshCircle, closeCircleOutline, addCircleOutline, newspaperOutline, buildOutline });
    
  }

  ngOnInit() {
    this.langService.getEnvironment().subscribe(
  config => {
    this.langConfig = config;
    // Ensure that the properties exist in langConfig before accessing them
    
    const getTranslation = (key: string) => this.langConfig[key] ? this.langConfig[key][this.currentLanguage] : 'Unknown';
    this.title = getTranslation('title');
    this.tagline = getTranslation('tagline');
    this.taglineDescription = getTranslation('taglineDescription');
    this.portfolio = getTranslation('portfolio');
    this.blog = getTranslation('blog');
    this.services = getTranslation('services');
    this.changeDetectorRef.detectChanges();
  },
  error => {
    // Handle the error and alert the error message
    this.changeDetectorRef.detectChanges();
    alert('Error: ' + error.message);
  }
);
  }

}
