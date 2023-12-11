import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BillingAndInvoicingPage } from './billing-and-invoicing.page';

describe('BillingAndInvoicingPage', () => {
  let component: BillingAndInvoicingPage;
  let fixture: ComponentFixture<BillingAndInvoicingPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BillingAndInvoicingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
