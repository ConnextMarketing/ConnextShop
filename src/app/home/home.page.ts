import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IonApp, IonRouterOutlet, IonHeader, IonToolbar, IonButton, IonTitle, IonMenuButton, IonButtons, IonMenu, IonContent, IonList, IonItem } from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp, bookOutline, bookSharp, briefcaseOutline, buildOutline, codeSlashOutline, codeSlashSharp, colorPaletteOutline, colorPaletteSharp, chatbubblesOutline, chatbubblesSharp, scanCircle, backspace, refreshCircle, closeCircleOutline, addCircleOutline, newspaperOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class HomePage implements OnInit {
  
  public title = "";
  public tagline = "";
  public taglineDescription = "";
  public portfolio = "";
  public blog = "";
  public services = "";
  
  constructor() { 
    
    addIcons({ chatbubblesOutline, chatbubblesSharp, colorPaletteOutline, colorPaletteSharp, paperPlaneOutline, bookOutline, bookSharp, briefcaseOutline, codeSlashOutline, codeSlashSharp, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp, scanCircle, backspace, refreshCircle, closeCircleOutline, addCircleOutline, newspaperOutline, buildOutline });
    
  }

  ngOnInit() {
  }

}
