import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LangService  } from './services/lang.service';
import { LangConfig } from './interfaces/lang-config';
@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ServicesPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
