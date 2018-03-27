import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  newTrainingForm: FormGroup;
  trainingExercises: Exercise [] = [];

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.newTrainingForm = new FormGroup({
      trainingOption: new FormControl('', {
        validators: [ Validators.required ]
      })
    });
    this.trainingExercises = this.trainingService.getCurrentExercises();
  }

  startTraining() {
    this.trainingService.startExercise(this.newTrainingForm.value.trainingOption);
  }
}
