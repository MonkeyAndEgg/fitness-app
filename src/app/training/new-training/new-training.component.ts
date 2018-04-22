import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { UIService } from '../../common/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  newTrainingForm: FormGroup;
  exercises: Exercise[];
  exerciseSubscription: Subscription;
  loadingSubs: Subscription;

  isLoading = false;

  constructor(private trainingService: TrainingService,
              private uiService: UIService) { }

  ngOnInit() {
    this.loadingSubs = this.uiService.loadingState.subscribe(state => {
      this.isLoading = state;
    });

    this.newTrainingForm = new FormGroup({
      trainingOption: new FormControl('', {
        validators: [ Validators.required ]
      })
    });
    this.exerciseSubscription = this.trainingService.latestExercises.subscribe(exercises => {
      this.exercises = exercises;
    });
    this.retrieveExercises();
  }

  retrieveExercises() {
    this.trainingService.retrieveCurrentExercises();
  }

  ngOnDestroy() {
    this.exerciseSubscription.unsubscribe();
    this.loadingSubs.unsubscribe();
  }

  startTraining() {
    this.trainingService.startExercise(this.newTrainingForm.value.trainingOption);
  }
}
