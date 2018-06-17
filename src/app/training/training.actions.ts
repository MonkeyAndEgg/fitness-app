import { Action } from '@ngrx/store';
import { Exercise } from './exercise.model';

export const SET_AVAILABLE_TRAINING = 'set available training';
export const SET_FINISHED_TRAINING = 'set finished training ';
export const START_ACTIVE_TRAINING = 'start active training';
export const STOP_ACTIVE_TRAINING = 'stop active training';

export class SetAvailableTraining implements Action {
  readonly type = SET_AVAILABLE_TRAINING;

  constructor(public paylod: Exercise[]) {}
}

export class SetFinishedTraining implements Action {
  readonly type = SET_FINISHED_TRAINING;

  constructor(public paylod: Exercise[]) {}
}

export class StartActiveTraining implements Action {
  readonly type = START_ACTIVE_TRAINING;

  constructor(public paylod: string) {}
}
export class StopActiveTraining implements Action {
  readonly type = STOP_ACTIVE_TRAINING;
}

export type TrainingActions = SetAvailableTraining | SetFinishedTraining | StartActiveTraining | StopActiveTraining;
