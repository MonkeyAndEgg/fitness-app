import { Exercise } from './exercise.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subscription } from 'rxjs/Subscription';
import { UIService } from '../common/ui.service';
import * as UI from '../common/ui.actions';
import * as fromTraining from './training.reducer';
import * as Training from './training.actions';
import { Store } from '@ngrx/store';
import {take} from 'rxjs/operators';

@Injectable()
export class TrainingService {
  private firebaseSubscriptions: Subscription[] = [];

  constructor(private database: AngularFirestore,
              private uiService: UIService,
              private store: Store<fromTraining.State>) {}

  retrieveCurrentExercises() {
    this.store.dispatch(new UI.StartLoading());

    this.firebaseSubscriptions.push(this.database
      .collection('exercises')
      .snapshotChanges()
      .map(dataArray => {
        return dataArray.map(data => {
          return {
            id: data.payload.doc.id,
            name: data.payload.doc.data().name,
            duration: data.payload.doc.data().duration,
            calories: data.payload.doc.data().calories
          };
        });
      })
      .subscribe((exercises: Exercise[]) => {
        this.store.dispatch(new UI.StopLoading());
        this.store.dispatch(new Training.SetAvailableTraining(exercises));
      }, error => {
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackBar('Fetching exercises failed.', null, 3000);
      }));
  }

  startExercise(selectedId: string) {
    this.store.dispatch(new Training.StartActiveTraining(selectedId));
  }

  cancelTraining(progress: number) {
    this.store.select(fromTraining.getActiveExercise)
      .pipe(take(1))
      .subscribe(exercise => {
        this.passDataToDatabase({
          ...exercise,
          duration: exercise.duration * (progress / 100),
          calories: exercise.calories * (progress / 100),
          date: new Date(),
          state: 'cancelled'
        });
        this.store.dispatch(new Training.StopActiveTraining());
    });
  }

  completeTraining() {
    this.store.select(fromTraining.getActiveExercise)
      .pipe(take(1))
      .subscribe(exercise => {
        if (exercise) {
          this.passDataToDatabase({
            ...exercise,
            date: new Date(),
            state: 'completed'
          });
          this.store.dispatch(new Training.StopActiveTraining());
        }
    });
  }

  retrievePastExercises() {
    this.firebaseSubscriptions.push(
      this.database
        .collection('finishedExercises')
        .valueChanges()
        .subscribe((exercises: Exercise[]) => {
          this.store.dispatch(new Training.SetFinishedTraining(exercises));
        }));
  }

  cancelSubscriptions() {
    this.firebaseSubscriptions.forEach(sub => sub.unsubscribe());
  }

  private passDataToDatabase(exercise: Exercise) {
    this.database.collection('finishedExercises').add(exercise);
  }
}
