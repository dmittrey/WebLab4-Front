import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryPageHeaderComponent } from './entry-page-header.component';

describe('EntryPageHeaderComponent', () => {
  let component: EntryPageHeaderComponent;
  let fixture: ComponentFixture<EntryPageHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntryPageHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryPageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
