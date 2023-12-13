import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp, buildOutline, buildSharp, folderOpenOutline, folderOpenSharp, eyeOutline, eyeSharp, callOutline, callSharp } from 'ionicons/icons';
import { LangService } from './services/lang.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet],
  providers: [LangService]
})
export class AppComponent implements OnInit {
  
  public title = "";
  public tagline = "";
  public account = "";
  public signIn = "";
  public signOut = "";
  public signedIn = false;
  
  // Navigation titles.
  services = "";
  caseStudies = "";
  insights = "";
  contact = "";
  
  public appPages = [
    { title: services, url: '/services', icon: 'build' },
    { title: caseStudies, url: '/portfolio', icon: 'folder-open' },
    { title: insights, url: '/blog', icon: 'eye' },
    { title: contact, url: '/contact', icon: 'call' },
    
  ];
  
  constructor() {
    addIcons({ mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp, buildOutline, buildSharp, folderOpenOutline, folderOpenSharp, eyeOutline, eyeSharp, callOutline, callSharp });
  }
  
  ngOnInit() {
    this.envService.getEnvironment().subscribe(config => {
      this.environmentConfig = config;
      console.log(this.environmentConfig);
    });
  }
}
