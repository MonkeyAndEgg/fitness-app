import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ERROR_HINT_MESSAGES } from '../../message/error-hint-message';
import { GENERAL_MESSAGES } from '../../message/general-messages';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  maxDate;

  ERROR_HINT_MESSAGES = ERROR_HINT_MESSAGES;
  GENERAL_MESSAGES = GENERAL_MESSAGES;

  constructor() { }

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(2015);
  }

  onSubmit(form: NgForm) {
    console.log(form);
  }
}
