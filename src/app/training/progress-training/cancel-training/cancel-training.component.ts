import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-cancel-training',
  templateUrl: './cancel-training.component.html',
  styleUrls: ['./cancel-training.component.css']
})
export class CancelTrainingComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
