import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingComponent } from './training.component';
import { ProgressTrainingComponent } from './progress-training/progress-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import { CancelTrainingComponent } from './progress-training/cancel-training/cancel-training.component';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TrainingComponent,
    ProgressTrainingComponent,
    NewTrainingComponent,
    PastTrainingComponent,
    CancelTrainingComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    AngularFirestoreModule,
    ReactiveFormsModule
  ],
  exports: [],
  entryComponents: [CancelTrainingComponent]
})
export class TrainingModule {

}
