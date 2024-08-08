import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-client-management',
  templateUrl: './client-management.page.html',
  styleUrls: ['./client-management.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ClientManagementPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
