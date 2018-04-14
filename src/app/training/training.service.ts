import { Exercise } from './exercise.model';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class TrainingService {
  private currentExercises: Exercise[] = [];
  private selectedExercise: Exercise;
  private firebaseSubscriptions: Subscription[] = [];

  activeExercise = new Subject<Exercise>();
  latestExercises = new Subject<Exercise[]>();
  pastExercises = new Subject<Exercise[]>();

  constructor(private database: AngularFirestore) {}

  retrieveCurrentExercises() {
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
        this.currentExercises = exercises;
        this.latestExercises.next([ ...this.currentExercises ]);
      }));
  }

  startExercise(selectedId: string) {
    this.selectedExercise = this.currentExercises.find(exercise => exercise.id === selectedId);
    this.activeExercise.next({ ...this.selectedExercise });
  }

  getSelectedExercise() {
    return { ...this.selectedExercise };
  }

  cancelTraining(progress: number) {
    this.passDataToDatabase({ ...this.selectedExercise,
      duration: this.selectedExercise.duration * (progress / 100),
      calories: this.selectedExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });
    this.selectedExercise = null;
    this.activeExercise.next(null);
  }

  completeTraining() {
    this.passDataToDatabase({ ...this.selectedExercise,
      date: new Date(),
      state: 'completed'
    });
    this.selectedExercise = null;
    this.activeExercise.next(null);
  }

  retrievePastExercises() {
    this.firebaseSubscriptions.push(
      this.database.collection('finishedExercises')
      .valueChanges()
      .subscribe((exercises: Exercise[]) => {
        this.pastExercises.next(exercises);
      }));
  }

  cancelSubscriptions() {
    this.firebaseSubscriptions.forEach(sub => sub.unsubscribe());
  }

  private passDataToDatabase(exercise: Exercise) {
    this.database.collection('finishedExercises').add(exercise);
  }
}
