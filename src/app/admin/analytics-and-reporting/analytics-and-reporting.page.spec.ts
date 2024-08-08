import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnalyticsAndReportingPage } from './analytics-and-reporting.page';

describe('AnalyticsAndReportingPage', () => {
  let component: AnalyticsAndReportingPage;
  let fixture: ComponentFixture<AnalyticsAndReportingPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AnalyticsAndReportingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
