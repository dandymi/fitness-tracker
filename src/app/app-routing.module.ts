import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {WelcomeComponent} from './welcome/welcome.component';
import {AuthGuard} from './auth';
import {TrainingComponent} from './training';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
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
