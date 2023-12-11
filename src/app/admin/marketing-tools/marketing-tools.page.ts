import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-marketing-tools',
  templateUrl: './marketing-tools.page.html',
  styleUrls: ['./marketing-tools.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class MarketingToolsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
