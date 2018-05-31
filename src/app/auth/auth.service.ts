import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { TrainingService } from '../training';
import { MatSnackBar } from '@angular/material';
import { UIService } from '../shared';

@Injectable()
export class AuthService {

  private isAuthenticated = false;
  public authChange = new Subject<boolean>();

  constructor(
      private router: Router,
      private afAuth: AngularFireAuth,
      private trainingService: TrainingService,
      private snackbar: MatSnackBar,
      private uiService: UIService) {}

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscriptions();
        this.isAuthenticated = false;
        this.authChange.next(false);
        this.router.navigate(['/login']);
      }
    });
  }

  registerUser(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    this.afAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(
        authData.email, authData.password)
            .then(result => {
              this.uiService.loadingStateChanged.next(false);
            })
            .catch(error => {
              this.uiService.loadingStateChanged.next(false);
              this.snackbar.open(error.message, null, {
                duration: 300
              });
            });
  }

  login(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.uiService.loadingStateChanged.next(false);
      })
      .catch(error => {
        this.uiService.loadingStateChanged.next(false);
        this.snackbar.open(error.message, null, {
          duration: 600
        });
      });
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }

}
