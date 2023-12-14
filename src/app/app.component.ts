import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp, buildOutline, buildSharp, folderOpenOutline, folderOpenSharp, eyeOutline, eyeSharp, callOutline, callSharp } from 'ionicons/icons';
import { LangService, LangConfig } from './services/lang.service';

interface AppPage {
  title: string;
  url: string;
  icon: string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet],
  providers: [LangService]
})
export class AppComponent implements OnInit {
  
  langConfig!: LangConfig;
  currentLanguage: string = 'eng'; // this could be dynamically set
  public title!: string;
  public tagline!: string;
  public account!: string;
  public signIn!: string;
  public signOut!: string;
  
  public signedIn = false;
  
  public appPages!: AppPage[];
  
  constructor(private langService: LangService) {
    addIcons({ mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp, buildOutline, buildSharp, folderOpenOutline, folderOpenSharp, eyeOutline, eyeSharp, callOutline, callSharp });
  }
  
  ngOnInit() {
    this.langService.getEnvironment().subscribe(config => {
      this.langConfig = config;
      this.appPages = [
    { title: this.langConfig.services[this.currentLanguage], url: '/services', icon: 'build' },
    { title: this.langConfig.portfolio[this.currentLanguage], url: '/portfolio', icon: 'folder-open' },
    { title: this.langConfig.blog[this.currentLanguage], url: '/blog', icon: 'eye' },
    { title: this.langConfig.contact[this.currentLanguage], url: '/contact', icon: 'call' },
  ];
  
  this.title = this.langConfig.title[this.currentLanguage];
  this.tagline = this.langConfig.tagline[this.currentLanguage];
  this.account = this.langConfig.account[this.currentLanguage];
  this.signIn = this.langConfig.signIn[this.currentLanguage];
  this.signOut = this.langConfig.signOut[this.currentLanguage];
    });
  }

  setLanguage(lang: string) {
    this.currentLanguage = lang;
  }
}
