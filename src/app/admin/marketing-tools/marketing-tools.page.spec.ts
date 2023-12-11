import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MarketingToolsPage } from './marketing-tools.page';

describe('MarketingToolsPage', () => {
  let component: MarketingToolsPage;
  let fixture: ComponentFixture<MarketingToolsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MarketingToolsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
