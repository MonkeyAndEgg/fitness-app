import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  progressTrainingEnabled = false;

  constructor() { }

  ngOnInit() {
  }

  toggleCurrentTraining() {
    this.progressTrainingEnabled = !this.progressTrainingEnabled;
  }
}
