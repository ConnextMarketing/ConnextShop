import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiceCatalogManagementPage } from './service-catalog-management.page';

describe('ServiceCatalogManagementPage', () => {
  let component: ServiceCatalogManagementPage;
  let fixture: ComponentFixture<ServiceCatalogManagementPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ServiceCatalogManagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
