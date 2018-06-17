import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { TrainingService } from '../training/training.service';
import { UIService } from '../common/ui.service';
import { Action, Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import * as UI from '../common/ui.actions';
import * as Auth from './auth.actions';

@Injectable()
export class AuthService {
  readonly ROUTING_PAGE = {
    TRAINING: '/training',
    LOGIN: '/login'
  };

  constructor(private router: Router,
              private angularFireAuth: AngularFireAuth,
              private trainingService: TrainingService,
              private uiService: UIService,
              private store: Store<fromRoot.State>) {}

  initAuthStateListener() {
    this.angularFireAuth.authState.subscribe(user => {
      if (user) {
        this.onChangeAuthStatus(this.ROUTING_PAGE.TRAINING, new Auth.Authenticated());
      } else {
        this.onChangeAuthStatus(this.ROUTING_PAGE.LOGIN, new Auth.Unauthenticated());
        this.trainingService.cancelSubscriptions();
      }
    });
  }

  registerUser(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());

    this.angularFireAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password).then(result => {
      this.store.dispatch(new UI.StopLoading());
    }).catch(error => {
      this.store.dispatch(new UI.StopLoading());

      this.uiService.showSnackBar(error.message, null, 3000);
    });
  }

  login(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());

    this.angularFireAuth.auth.signInWithEmailAndPassword(
      authData.email,
      authData.password
    ).then(result => {
      this.store.dispatch(new UI.StopLoading());
    }).catch(error => {
      this.store.dispatch(new UI.StopLoading());

      this.uiService.showSnackBar(error.message, null, 3000);
    });
  }

  logout() {
    this.angularFireAuth.auth.signOut();
  }

  private onChangeAuthStatus(routingPage: string, action: Action) {
    this.store.dispatch(action);
    this.router.navigate([routingPage]);
  }
}
