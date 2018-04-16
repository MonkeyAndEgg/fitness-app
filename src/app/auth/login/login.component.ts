import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ERROR_HINT_MESSAGES } from '../../message/error-hint-message';
import { AuthService } from '../auth.service';
import { UIService } from '../../common/ui.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  private loadingSubs: Subscription;

  loginForm: FormGroup;
  isLoading = false;

  ERROR_HINT_MESSAGES = ERROR_HINT_MESSAGES;

  constructor(private authService: AuthService,
              private uiService: UIService) { }

  ngOnInit() {
    this.loadingSubs = this.uiService.loadingState.subscribe(state => {
      this.isLoading = state;
    });
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', {
        validators: [Validators.required]
      })
    });
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }

  onSubmit() {
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }

}
