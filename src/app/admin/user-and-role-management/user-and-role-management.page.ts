import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-user-and-role-management',
  templateUrl: './user-and-role-management.page.html',
  styleUrls: ['./user-and-role-management.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class UserAndRoleManagementPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
