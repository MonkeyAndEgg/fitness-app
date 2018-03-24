import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CencelTrainingComponent } from './cancel-training.component';

describe('CencelTrainingComponent', () => {
  let component: CencelTrainingComponent;
  let fixture: ComponentFixture<CencelTrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CencelTrainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CencelTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
