import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { MatDialog } from '@angular/material';
import { CancelTrainingComponent } from './cencel-training/cancel-training.component';

@Component({
  selector: 'app-progress-training',
  templateUrl: './progress-training.component.html',
  styleUrls: ['./progress-training.component.css']
})
export class ProgressTrainingComponent implements OnInit {
  @Output()
  exitTraining = new EventEmitter<void>();

  progress = 0;
  timer: any;

  constructor(private dialog: MatDialog) { }

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
        this.exitTraining.emit();
      } else {
        this.enableTimer();
      }
    });
  }

  enableTimer() {
    this.timer = setInterval(() => {
      this.progress = this.progress + 10;
      if (this.progress >= 100) {
        clearInterval(this.timer);
      }
    }, 1000);
  }

}
