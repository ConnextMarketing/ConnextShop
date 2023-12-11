import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BillingAndSubscriptionManagementPage } from './billing-and-subscription-management.page';

describe('BillingAndSubscriptionManagementPage', () => {
  let component: BillingAndSubscriptionManagementPage;
  let fixture: ComponentFixture<BillingAndSubscriptionManagementPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BillingAndSubscriptionManagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
