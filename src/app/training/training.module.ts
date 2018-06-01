import { NgModule } from '@angular/core';
import { TrainingComponent } from './training.component';
import { ProgressTrainingComponent } from './progress-training/progress-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import { CancelTrainingComponent } from './progress-training/cancel-training/cancel-training.component';
import { SharedModule } from '../common/shared.module';
import { TrainingRoutingModule } from './training-routing.module';

@NgModule({
  declarations: [
    TrainingComponent,
    ProgressTrainingComponent,
    NewTrainingComponent,
    PastTrainingComponent,
    CancelTrainingComponent
  ],
  imports: [
    SharedModule,
    TrainingRoutingModule
  ],
  exports: [],
  entryComponents: [CancelTrainingComponent]
})
export class TrainingModule {

}
