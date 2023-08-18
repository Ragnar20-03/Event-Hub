import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeicaleventsComponent } from './speicalevents.component';

describe('SpeicaleventsComponent', () => {
  let component: SpeicaleventsComponent;
  let fixture: ComponentFixture<SpeicaleventsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpeicaleventsComponent]
    });
    fixture = TestBed.createComponent(SpeicaleventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
