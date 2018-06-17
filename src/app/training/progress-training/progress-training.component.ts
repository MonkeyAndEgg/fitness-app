import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CancelTrainingComponent } from './cancel-training/cancel-training.component';
import { TrainingService } from '../training.service';
import { Store } from '@ngrx/store';
import * as fromTraining from '../training.reducer';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-progress-training',
  templateUrl: './progress-training.component.html',
  styleUrls: ['./progress-training.component.css']
})
export class ProgressTrainingComponent implements OnInit {
  progress = 0;
  timer: any;

  constructor(private dialog: MatDialog,
              private trainingService: TrainingService,
              private store: Store<fromTraining.State>) { }

  ngOnInit() {
    this.enableTimer();
  }

  onCancel() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(CancelTrainingComponent, {
      width: '250px',
      data: {
        progress: this.progress
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.trainingService.cancelTraining(this.progress);
      } else {
        this.enableTimer();
      }
    });
  }

  enableTimer() {
    this.store.select(fromTraining.getActiveExercise)
      .pipe(take(1))
      .subscribe(exercise => {
        if (exercise) {
          const step = exercise.duration / 100 * 1000;
          this.timer = setInterval(() => {
            this.progress = this.progress + 1;
            if (this.progress >= 100) {
              this.trainingService.completeTraining();
              clearInterval(this.timer);
            }
          }, step);
        }
    });
  }

}
