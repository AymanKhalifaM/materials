import { Subscription } from 'rxjs';
import { UiService } from './../../shared/ui.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  maxDate;
  isLoading = false ; 
  private loading : Subscription;

  constructor(private authService: AuthService , private uiService:UiService) { }

  ngOnInit() {
    this.loading = this.uiService.loadingStateChange.subscribe(loading=>{
      this.isLoading = loading ;
    })
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }

}
