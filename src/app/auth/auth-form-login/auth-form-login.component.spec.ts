import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthFormLoginComponent } from './auth-form-login.component';

describe('AuthFormLoginComponent', () => {
  let component: AuthFormLoginComponent;
  let fixture: ComponentFixture<AuthFormLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthFormLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthFormLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
