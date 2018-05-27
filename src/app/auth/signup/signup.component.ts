import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ERROR_HINT_MESSAGES } from '../../message/error-hint-message';
import { GENERAL_MESSAGES } from '../../message/general-messages';
import { AuthService } from '../auth.service';
import { UIService } from '../../common/ui.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  private loadingSubs: Subscription;
  maxDate;
  signupForm: FormGroup;

  isLoading = false;

  ERROR_HINT_MESSAGES = ERROR_HINT_MESSAGES;
  GENERAL_MESSAGES = GENERAL_MESSAGES;

  constructor(private authService: AuthService,
              private uiService: UIService) { }

  ngOnInit() {
    this.uiService.loadingState.subscribe(state => {
      this.isLoading = state;
    });
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

  ngOnDestroy() {
    if (this.uiService.loadingState) {
      this.uiService.loadingState.unsubscribe();
    }
  }

  onSubmit() {
    this.authService.registerUser({
      email: this.signupForm.value.email,
      password: this.signupForm.value.password
    });
  }
}
