import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import { ERROR_HINT_MESSAGES } from '../../message/error-hint-message';
import { GENERAL_MESSAGES } from '../../message/general-messages';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  maxDate;
  signupForm: FormGroup;

  ERROR_HINT_MESSAGES = ERROR_HINT_MESSAGES;
  GENERAL_MESSAGES = GENERAL_MESSAGES;

  constructor() { }

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(2015);
    this.signupForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)]
      }),
      birthDate: new FormControl('', {
        validators: [Validators.required]
      }),
      checkbox: new FormControl('', {
        validators: [Validators.required]
      })
    });
  }

  onSubmit() {
    console.log(this.signupForm);
  }
}
