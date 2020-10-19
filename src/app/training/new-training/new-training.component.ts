import { UiService } from './../../shared/ui.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import {  Subscription } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit , OnDestroy {
  exercises: Exercise[];
  exerciseSubscription:Subscription;
  private loadingSubs:Subscription;
  isLoading = false;

  constructor(private trainingService: TrainingService , private uiService:UiService) { }

  ngOnInit() {
    // this.exercises = this.trainingService.getAvailableExercises();
    this.uiService.loadingStateChange.subscribe(loading=>{
      this.isLoading=loading;
    })
    this.trainingService.fetchAvailableExercises();

    this.exerciseSubscription = this.trainingService.exeChanged.subscribe(exercises => {
      this.exercises = exercises
    })

  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy(){
    if( this.exerciseSubscription){
      this.exerciseSubscription.unsubscribe()
    }
    if(  this.loadingSubs){
      this.loadingSubs.unsubscribe();
    }
    
  }

}
