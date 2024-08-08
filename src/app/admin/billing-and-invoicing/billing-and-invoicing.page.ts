import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-billing-and-invoicing',
  templateUrl: './billing-and-invoicing.page.html',
  styleUrls: ['./billing-and-invoicing.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class BillingAndInvoicingPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
