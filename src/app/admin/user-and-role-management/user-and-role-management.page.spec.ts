import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserAndRoleManagementPage } from './user-and-role-management.page';

describe('UserAndRoleManagementPage', () => {
  let component: UserAndRoleManagementPage;
  let fixture: ComponentFixture<UserAndRoleManagementPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UserAndRoleManagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
