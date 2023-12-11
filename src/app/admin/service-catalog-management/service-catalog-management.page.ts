import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-service-catalog-management',
  templateUrl: './service-catalog-management.page.html',
  styleUrls: ['./service-catalog-management.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ServiceCatalogManagementPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
