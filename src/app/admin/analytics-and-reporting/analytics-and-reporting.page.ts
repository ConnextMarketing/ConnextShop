import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-analytics-and-reporting',
  templateUrl: './analytics-and-reporting.page.html',
  styleUrls: ['./analytics-and-reporting.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AnalyticsAndReportingPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
