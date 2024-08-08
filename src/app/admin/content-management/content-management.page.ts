import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-content-management',
  templateUrl: './content-management.page.html',
  styleUrls: ['./content-management.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ContentManagementPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
