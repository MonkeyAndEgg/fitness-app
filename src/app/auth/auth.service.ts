import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  private user: User;
  readonly ROUTING_PAGE = {
    TRAINING: '/training',
    LOGIN: '/login'
  };

  authStatus = new Subject<boolean>();

  constructor(private router: Router) {}

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };

    this.onChangeAuthStatus(this.ROUTING_PAGE.TRAINING, true);
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };

    this.onChangeAuthStatus(this.ROUTING_PAGE.TRAINING, true);
  }

  logout() {
    this.user = undefined;

    this.onChangeAuthStatus(this.ROUTING_PAGE.LOGIN, false);
  }

  getUser() {
    // given this.user is private, return this.user directly will simply
    // get people to access the private object, so use {...} to return
    // brand new object to avoid the access
    return { ...this.user };
  }

  isAuth() {
    return this.user !== undefined;
  }

  private onChangeAuthStatus(routingPage: string, status: boolean) {
    this.authStatus.next(status);
    this.router.navigate([routingPage]);
  }
}
