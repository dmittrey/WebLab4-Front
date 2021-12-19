import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthFormSwitcherComponent } from './auth-form-switcher.component';

describe('AuthFormSwitcherComponent', () => {
  let component: AuthFormSwitcherComponent;
  let fixture: ComponentFixture<AuthFormSwitcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthFormSwitcherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthFormSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
