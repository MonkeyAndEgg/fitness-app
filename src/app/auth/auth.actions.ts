import { Action } from '@ngrx/store';

export const AUTHENTICATED = 'authenticated';
export const UNAUTHENTICATED = 'unauthenticated';

export class Authenticated implements Action {
  readonly type = AUTHENTICATED;
}

export class Unauthenticated implements Action {
  readonly type = UNAUTHENTICATED;
}

export type AuthActions = Authenticated | Unauthenticated;
