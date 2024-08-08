import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.page.html',
  styleUrls: ['./project-management.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ProjectManagementPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
