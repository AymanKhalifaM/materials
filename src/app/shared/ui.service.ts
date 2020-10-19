import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  loadingStateChange = new Subject<boolean>();
  constructor(private snackbar:MatSnackBar) { }

  showSnackbar(message,action,duration){
    this.snackbar.open(message,action,{
      duration:duration
    })
  }
  
}
