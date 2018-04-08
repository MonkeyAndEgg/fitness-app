import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthService {
  private authenticated = false;
  readonly ROUTING_PAGE = {
    TRAINING: '/training',
    LOGIN: '/login'
  };

  authStatus = new Subject<boolean>();

  constructor(private router: Router,
              private angularFireAuth: AngularFireAuth) {}

  registerUser(authData: AuthData) {
    this.angularFireAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password).then(result => {
      this.authenticated = true;
      this.onChangeAuthStatus(this.ROUTING_PAGE.TRAINING, true);
    }).catch(error => {
      console.log(error);
    });
  }

  login(authData: AuthData) {
    this.angularFireAuth.auth.signInWithEmailAndPassword(
      authData.email,
      authData.password
    ).then(result => {
      this.authenticated = true;
      this.onChangeAuthStatus(this.ROUTING_PAGE.TRAINING, true);
    }).catch(error => {
      console.log(error);
    });
  }

  logout() {
    this.authenticated = false;

    this.onChangeAuthStatus(this.ROUTING_PAGE.LOGIN, false);
  }

  isAuth() {
    return this.authenticated;
  }

  private onChangeAuthStatus(routingPage: string, status: boolean) {
    this.authStatus.next(status);
    this.router.navigate([routingPage]);
  }
}
