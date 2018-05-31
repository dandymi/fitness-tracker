import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule, UIService } from './shared';
import { AuthSignupComponent, LoginComponent,
  AuthService, User, AuthData } from './auth';
import { TrainingComponent, CurrentTrainingComponent,
    NewTrainingComponent, PastTrainingsComponent,
    StopTrainingComponent, TrainingService } from './training';
import { HeaderComponent, SidenavListComponent } from './navigation';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthSignupComponent,
    LoginComponent,
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
    StopTrainingComponent
  ],
  imports:      [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase, 'ng-fitness-tracker'),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [
    AuthService,
    TrainingService,
    AngularFireDatabase,
    AngularFirestore,
    AngularFireAuth,
    UIService
  ],
  bootstrap:    [ AppComponent ],
  entryComponents: [StopTrainingComponent]
})
export class FitnessTrackerAppModule { }
