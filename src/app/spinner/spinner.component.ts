import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
  @Input()
  color = 'accent';

  @Input()
  diameter = 30;

  @Input()
  showSpinner = false;

  constructor() { }

  ngOnInit() {
  }

}
