import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {
  progressTrainingEnabled = false;
  activeExercise: Subscription;

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.activeExercise = this.trainingService.activeExercise.subscribe(exercise => {
      if (exercise) {
        this.progressTrainingEnabled = true;
      } else {
        this.progressTrainingEnabled = false;
      }
    });
  }

  ngOnDestroy() {
    this.activeExercise.unsubscribe();
  }

  toggleCurrentTraining() {
    this.progressTrainingEnabled = !this.progressTrainingEnabled;
  }
}
