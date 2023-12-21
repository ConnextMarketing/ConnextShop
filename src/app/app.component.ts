import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp, buildOutline, buildSharp, folderOpenOutline, folderOpenSharp, eyeOutline, eyeSharp, callOutline, callSharp } from 'ionicons/icons';
import { LangService  } from './services/lang.service';
import { LangConfig } from './interfaces/lang-config';

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
  imports: [RouterLink, RouterLinkActive, CommonModule, HttpClientModule, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet],
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
  
  constructor(
    private langService: LangService,
    private changeDetectorRef: ChangeDetectorRef
    ) {
    addIcons({ mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp, buildOutline, buildSharp, folderOpenOutline, folderOpenSharp, eyeOutline, eyeSharp, callOutline, callSharp });
  }
  
  ngOnInit() {
    alert("Initiated!");
    this.langService.getEnvironment().subscribe(
  config => {
    this.langConfig = config;

    // Ensure that the properties exist in langConfig before accessing them
    const getPageTitle = (key: string) => this.langConfig[key] ? this.langConfig[key][this.currentLanguage] : 'Unknown';

    this.appPages = [
      { title: getPageTitle('services'), url: '/services', icon: 'build' },
      { title: getPageTitle('portfolio'), url: '/portfolio', icon: 'folder-open' },
      { title: getPageTitle('blog'), url: '/blog', icon: 'eye' },
      { title: getPageTitle('contact'), url: '/contact', icon: 'call' },
    ];
  
    this.title = getPageTitle('title');
    this.tagline = getPageTitle('tagline');
    this.account = getPageTitle('account');
    this.signIn = getPageTitle('signIn');
    this.signOut = getPageTitle('signOut');
    this.changeDetectorRef.detectChanges();
    alert(this.title)
  },
  error => {
    // Handle the error and alert the error message
    this.changeDetectorRef.detectChanges();
    alert('Error: ' + error.message);
  }
);

  }

  setLanguage(lang: string) {
    this.currentLanguage = lang;
  }
}
