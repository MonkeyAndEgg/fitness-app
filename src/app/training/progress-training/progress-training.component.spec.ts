import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressTrainingComponent } from './progress-training.component';

describe('ProgressTrainingComponent', () => {
  let component: ProgressTrainingComponent;
  let fixture: ComponentFixture<ProgressTrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressTrainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
