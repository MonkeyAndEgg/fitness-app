import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { TrainingService } from '../training/training.service';
import { UIService } from '../common/ui.service';

@Injectable()
export class AuthService {
  private authenticated = false;
  readonly ROUTING_PAGE = {
    TRAINING: '/training',
    LOGIN: '/login'
  };

  authStatus = new Subject<boolean>();

  constructor(private router: Router,
              private angularFireAuth: AngularFireAuth,
              private trainingService: TrainingService,
              private uiService: UIService) {}

  initAuthStateListener() {
    this.angularFireAuth.authState.subscribe(user => {
      if (user) {
        this.authenticated = true;
        this.onChangeAuthStatus(this.ROUTING_PAGE.TRAINING, true);
      } else {
        this.authenticated = false;
        this.onChangeAuthStatus(this.ROUTING_PAGE.LOGIN, false);
        this.trainingService.cancelSubscriptions();
      }
    });
  }

  registerUser(authData: AuthData) {
    this.uiService.loadingState.next(true);

    this.angularFireAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password).then(result => {
      this.uiService.loadingState.next(false);
    }).catch(error => {
      this.uiService.loadingState.next(false);

      this.uiService.showSnackBar(error.message, null, 3000);
    });
  }

  login(authData: AuthData) {
    this.uiService.loadingState.next(true);

    this.angularFireAuth.auth.signInWithEmailAndPassword(
      authData.email,
      authData.password
    ).then(result => {
      this.uiService.loadingState.next(false);
    }).catch(error => {
      this.uiService.loadingState.next(false);

      this.uiService.showSnackBar(error.message, null, 3000);
    });
  }

  logout() {
    this.angularFireAuth.auth.signOut();
  }

  isAuth() {
    return this.authenticated;
  }

  private onChangeAuthStatus(routingPage: string, status: boolean) {
    this.authStatus.next(status);
    this.router.navigate([routingPage]);
  }
}
