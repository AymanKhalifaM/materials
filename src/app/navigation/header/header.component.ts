import { AuthService } from './../../auth/auth.service';
import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
 @Output() sidenavToggle = new EventEmitter<void>();
 isAuth:boolean = false;
 sub:Subscription;
  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.sub = this.authService.authChange.subscribe(authStatus=>{
      this.isAuth = authStatus;
    })
  }

  onLogout(){
    this.authService.logout();
  }

  onToggleSidenav(){
   this.sidenavToggle.emit();
  }

  

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}
