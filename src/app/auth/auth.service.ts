import { UiService } from './../shared/ui.service';
import { TrainingService } from "./../training/training.service";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AngularFireAuth } from "angularfire2/auth";
import { User } from "./user.model";
import { AuthData } from "./auth-data.model";
import { MatSnackBar } from '@angular/material';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(
    private router: Router,
    private afauth: AngularFireAuth,
    private trainingSer: TrainingService,
    private snackbar:MatSnackBar,
    private uiService:UiService
  ) {}

  initAuthListener() {
    this.afauth.authState.subscribe((user) => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(["/training"]);
      } else {
        this.trainingSer.cancelSubs();
        this.isAuthenticated = false;
        this.authChange.next(false);
        this.router.navigate(["/login"]);
      }
    });
  }

  registerUser(authData: AuthData) {
    this.uiService.loadingStateChange.next(true);
    this.afauth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((res) => {
        // console.log(res)
        this.uiService.loadingStateChange.next(false);
      })
      .catch((err) => {
        this.uiService.loadingStateChange.next(false);
        this.uiService.showSnackbar(err.message,null,5000);
        // this.snackbar.open(err.message,null,{
        //   duration:5000
        // })
      });
  }

  login(authData: AuthData) {
    this.uiService.loadingStateChange.next(true);
    this.afauth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((res) => {
        this.uiService.loadingStateChange.next(false);
        
      })
      .catch((err) => {
        this.uiService.loadingStateChange.next(false);
        this.uiService.showSnackbar(err.message,null,3000);
        // this.snackbar.open(err.message,null,{
        //   duration:3000
        // })
      });

    
  }

  logout() {
    this.afauth.auth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }

 
}
