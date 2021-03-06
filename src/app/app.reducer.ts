import * as fromUi from './common/ui.reducer';
import * as fromAuth from './auth/auth.reducer';
import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';

export interface State {
  ui: fromUi.State;
  auth: fromAuth.State;
}

export const reducers: ActionReducerMap<State> = {
  ui: fromUi.uiReducer,
  auth: fromAuth.authReducer
};

export const getUiState = createFeatureSelector<fromUi.State>('ui');
export const getAuthState = createFeatureSelector<fromAuth.State>('auth');

export const getIsLoading = createSelector(getUiState, fromUi.selectUILoadingState);
export const getIsAuth = createSelector(getAuthState, fromAuth.selectAuthState);
