import { Exercise } from './exercise.model';
import { Subject } from 'rxjs/Subject';

export class TrainingService {
  private currentExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15},
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8}
  ];
  private selectedExercise: Exercise;
  private exercises: Exercise[] = [];

  activeExercise = new Subject<Exercise>();

  getCurrentExercises() {
    return this.currentExercises.slice();
  }

  startExercise(selectedId: string) {
    this.selectedExercise = this.currentExercises.find(exercise => exercise.id === selectedId);
    this.activeExercise.next({ ...this.selectedExercise });
  }

  getSelectedExercise() {
    return { ...this.selectedExercise };
  }

  cancelTraining(progress: number) {
    this.exercises.push({ ...this.selectedExercise,
      duration: this.selectedExercise.duration * (progress / 100),
      calories: this.selectedExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });
    this.selectedExercise = null;
    this.activeExercise.next(null);
  }

  completeTraining() {
    this.exercises.push({ ...this.selectedExercise,
      date: new Date(),
      state: 'completed'
    });
    this.selectedExercise = null;
    this.activeExercise.next(null);
  }
}
