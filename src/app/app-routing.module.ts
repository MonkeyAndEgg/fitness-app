import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: HomepageComponent
  },
  {
    path: 'training',
    loadChildren: './training/training.module#TrainingModule',
    canLoad: [AuthGuard]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [ AuthGuard ]
})
export class AppRoutingModule {}
