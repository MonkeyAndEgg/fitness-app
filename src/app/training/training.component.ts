import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrainingService } from './training.service';
import * as fromTraining from './training.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  progressTrainingEnabled$: Observable<boolean>;


  constructor(private trainingService: TrainingService,
              private store: Store<fromTraining.State>) { }

  ngOnInit() {
    this.progressTrainingEnabled$ = this.store.select(fromTraining.getIsTraining);
  }
}
