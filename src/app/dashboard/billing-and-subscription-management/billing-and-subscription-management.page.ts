import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-billing-and-subscription-management',
  templateUrl: './billing-and-subscription-management.page.html',
  styleUrls: ['./billing-and-subscription-management.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class BillingAndSubscriptionManagementPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
