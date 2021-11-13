import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupCardComponent } from './setup-card.component';

describe('SetupCardComponent', () => {
  let component: SetupCardComponent;
  let fixture: ComponentFixture<SetupCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetupCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
