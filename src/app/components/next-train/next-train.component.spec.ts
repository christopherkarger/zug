import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NextTrainComponent } from './next-train.component';

describe('NextTrainComponent', () => {
  let component: NextTrainComponent;
  let fixture: ComponentFixture<NextTrainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NextTrainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NextTrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
