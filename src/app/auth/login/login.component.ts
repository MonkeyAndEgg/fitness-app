import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ERROR_HINT_MESSAGES } from '../../message/error-hint-message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  ERROR_HINT_MESSAGES = ERROR_HINT_MESSAGES;

  constructor() { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', {
        validators: [Validators.required]
      })
    });
  }

  onSubmit() {
    console.log(this.loginForm);
  }

}
