import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentManagementPage } from './content-management.page';

describe('ContentManagementPage', () => {
  let component: ContentManagementPage;
  let fixture: ComponentFixture<ContentManagementPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ContentManagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
