import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {WelcomeComponent} from './welcome/welcome.component';
import {AuthSignupComponent, LoginComponent, AuthGuard} from './auth';
import {TrainingComponent} from './training';

const routes : Routes = [
  {
    path: '',
    component: WelcomeComponent
  }, {
    path: 'signup',
    component: AuthSignupComponent
  }, {
    path: 'login',
    component: LoginComponent
  }, {
    path: 'training',
    component: TrainingComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}