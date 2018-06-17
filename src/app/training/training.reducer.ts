import {
  SET_AVAILABLE_TRAINING, SET_FINISHED_TRAINING, START_ACTIVE_TRAINING, STOP_ACTIVE_TRAINING,
  TrainingActions
} from './training.actions';
import { Exercise } from './exercise.model';
import * as fromRoot from '../app.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export interface TrainingState {
  availableExercises: Exercise[];
  finishedExercises: Exercise[];
  activeExercise: Exercise;
}

export interface State extends fromRoot.State {
  training: TrainingState;
}

const initialState: TrainingState = {
  availableExercises: [],
  finishedExercises: [],
  activeExercise: null
};

export function trainingReducer(state = initialState, action: TrainingActions) {
  switch (action.type) {
    case SET_AVAILABLE_TRAINING:
      return {
        ...state,
        availableExercises: action.paylod
      };
    case SET_FINISHED_TRAINING:
      return {
        ...state,
        finishedExercises: action.paylod
      };
    case START_ACTIVE_TRAINING:
      return {
        ...state,
        activeExercise: { ...state.availableExercises.find(exercise => exercise.id === action.paylod) }
      };
    case STOP_ACTIVE_TRAINING:
      return {
        ...state,
        activeExercise: null
      };
    default:
      return state;
  }
}

export const getTrainingState = createFeatureSelector<TrainingState>('training');

export const getAvailableExercises = createSelector(getTrainingState, (state: TrainingState) => state.availableExercises);
export const getFinishedExercises = createSelector(getTrainingState, (state: TrainingState) => state.finishedExercises);
export const getActiveExercise = createSelector(getTrainingState, (state: TrainingState) => state.activeExercise);
export const getIsTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeExercise != null);
