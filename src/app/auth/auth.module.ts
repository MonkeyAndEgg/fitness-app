import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { SharedModule } from '../common/shared.module';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent,
    SpinnerComponent
  ],
  imports: [
    AngularFireAuthModule,
    SharedModule,
    AuthRoutingModule
  ],
  exports: []
})
export class AuthModule {}
