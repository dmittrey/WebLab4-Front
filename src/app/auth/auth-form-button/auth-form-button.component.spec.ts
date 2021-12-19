import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthFormButtonComponent } from './auth-form-button.component';

describe('AuthFormButtonComponent', () => {
  let component: AuthFormButtonComponent;
  let fixture: ComponentFixture<AuthFormButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthFormButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthFormButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
