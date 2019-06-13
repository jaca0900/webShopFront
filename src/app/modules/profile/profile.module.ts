import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from '../shared/shared.module';
import { ProfileRouter } from './profile.router';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    ProfileRouter,
    SharedModule
  ],
  exports: [
    LoginComponent,
    RegisterComponent
  ],
  providers: []
})
export class ProfileModule { }
