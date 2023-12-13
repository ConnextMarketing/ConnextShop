import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp, buildOutline, buildSharp, folderOpenOutline, folderOpenSharp, eyeOutline, eyeSharp, callOutline, callSharp } from 'ionicons/icons';
import { LangService, LangConfig } from './services/lang.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet],
  providers: [LangService]
})
export class AppComponent implements OnInit {
  
  langConfig: LangConfig;
  currentLanguage: string = 'eng'; // this could be dynamically set
  
  public signedIn = false;
  
  public appPages = [
    { title: services, url: '/services', icon: 'build' },
    { title: caseStudies, url: '/portfolio', icon: 'folder-open' },
    { title: insights, url: '/blog', icon: 'eye' },
    { title: contact, url: '/contact', icon: 'call' },
    
  ];
  
  constructor(private langService: LangService) {
    addIcons({ mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp, buildOutline, buildSharp, folderOpenOutline, folderOpenSharp, eyeOutline, eyeSharp, callOutline, callSharp });
  }
  
  ngOnInit() {
    this.langService.getEnvironment().subscribe(config => {
      this.environmentConfig = config;
      console.log(this.environmentConfig.title[this.currentLanguage]); // Access the 'title' for the current language
      // You can now access other properties in a similar way
    });
  }

  setLanguage(lang: string) {
    this.currentLanguage = lang;
  }
}
