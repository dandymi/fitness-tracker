import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UIService } from './shared';
import { AuthService } from './auth';
import { AuthModule } from './auth';
import { TrainingService } from './training';
import { TrainingModule } from './training';
import { HeaderComponent, SidenavListComponent } from './navigation';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent
  ],
  imports:      [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase, 'ng-fitness-tracker'),
    AngularFirestoreModule,
    AuthModule,
    TrainingModule
  ],
  providers: [
    AuthService,
    TrainingService,
    UIService
  ],
  bootstrap:    [ AppComponent ]
})
export class FitnessTrackerAppModule { }
