import {AuthActions, AUTHENTICATED, UNAUTHENTICATED} from './auth.actions';

export interface State {
  isAuth: boolean;
}

const initialState: State = {
  isAuth: false
};

export function authReducer(state = initialState, action: AuthActions) {
  switch (action.type) {
    case AUTHENTICATED:
      return {
        isAuth: true
      };
    case UNAUTHENTICATED:
      return {
        isAuth: false
      };
    default:
      return state;
  }
}

export const selectAuthState = (state: State) => state.isAuth;
