import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import * as fromTraining from '../training.reducer';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  newTrainingForm: FormGroup;
  exercises$: Observable<Exercise[]>;

  isLoading$: Observable<boolean>;

  constructor(private trainingService: TrainingService,
              private store: Store<fromTraining.State>) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.exercises$ = this.store.select(fromTraining.getAvailableExercises);

    this.newTrainingForm = new FormGroup({
      trainingOption: new FormControl('', {
        validators: [ Validators.required ]
      })
    });
    this.retrieveExercises();
  }

  retrieveExercises() {
    this.trainingService.retrieveCurrentExercises();
  }

  startTraining() {
    this.trainingService.startExercise(this.newTrainingForm.value.trainingOption);
  }
}
