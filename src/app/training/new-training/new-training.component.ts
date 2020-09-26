import { Exercise } from './../exercise.model';
import { TrainingService } from './../training.service';
import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  @Output() trainingStrat = new EventEmitter<void>();
  exercises:Exercise[] = [];
  constructor(private trainingService:TrainingService) { }

  ngOnInit() {
    this.exercises = this.trainingService.getAvailableExercises();
  }
  onStartTraining(){
    this.trainingStrat.emit()
  }
}
