import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SignupComponent } from '../auth/signup/signup.component';
import { LoginComponent } from '../auth/login/login.component';

const routes:Routes=[
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent }
]
@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule],
    providers:[]
})
export class AuthRoutingModule {}