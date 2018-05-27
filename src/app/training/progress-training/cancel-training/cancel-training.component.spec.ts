import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelTrainingComponent } from './cancel-training.component';

describe('CencelTrainingComponent', () => {
  let component: CancelTrainingComponent;
  let fixture: ComponentFixture<CancelTrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelTrainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
