import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs'
import { AuthData } from './auth-data.model';
import { User } from './user.model';


@Injectable()
export class AuthService {
    private user:User ; 

    constructor(private router:Router){}
    authChange = new Subject<boolean>();


    registerUser(authData:AuthData){
        this.user = {
            email:authData.email,
            userId:Math.round(Math.random()*1000).toString()
        };
       this.authDone();
    }


    login(authData:AuthData){
        this.user = {
            email:authData.email,
            userId:Math.round(Math.random()*1000).toString()
        };
       this.authDone();
    }


    logout(){
        this.user = null ;
        this.authChange.next(false);
        this.router.navigate(['/login'])
    }


    getUser(){
        return {...this.user} ;
    }

    isAuth(){
        return this.user !=null ;
    }

    authDone(){
        this.authChange.next(true);
        this.router.navigate(['/training'])
    }
}