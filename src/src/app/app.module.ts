import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './shared';
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
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [AuthService, TrainingService],
  bootstrap:    [ AppComponent ],
  entryComponents: [StopTrainingComponent]
})
export class FitnessTrackerAppModule { }
