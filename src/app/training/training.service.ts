import { Injectable } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
import { Subject,Subscription } from "rxjs";
import { map } from "rxjs/operators";

import { Exercise } from "./exercise.model";

@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  exeChanged = new Subject<Exercise[]>();
  finishExeChanged = new Subject<Exercise[]>();
  private availableExercises: Exercise[] = [];
  private runningExercise: Exercise;
  afSubs:Subscription[]=[]

  constructor(private db: AngularFirestore) {}

  fetchAvailableExercises() {
    this.afSubs.push(this.db
      .collection<Exercise>("availableExecrsie")
      .snapshotChanges()
      .pipe(
        map((docArr) => {
          return docArr.map((doc) => {
            return {
              id: doc.payload.doc.id,
              name: doc.payload.doc.data().name,
              duration: doc.payload.doc.data().duration,
              calories: doc.payload.doc.data().calories,
            };
          });
        })
      )
      .subscribe((exercises: Exercise[]) => {
        this.availableExercises = exercises;
        this.exeChanged.next([...this.availableExercises]);
      }));
  }

  startExercise(selectedId: string) {
    // this.db.doc('availableExecrsie/' + selectedId).update({lastSelected: new Date()});
    this.runningExercise = this.availableExercises.find(
      (ex) => ex.id === selectedId
    );
    this.exerciseChanged.next({ ...this.runningExercise });
  }

  completeExercise() {
    this.addDataToDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: "completed",
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.addDataToDatabase({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: "cancelled",
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  fetchCompletedOrCancelledExercises() {
    this.afSubs.push(this.db
      .collection("finishedExercises")
      .valueChanges()
      .subscribe((exercise: Exercise[]) => {
        this.finishExeChanged.next(exercise);
      }));
  }


  cancelSubs(){
    this.afSubs.forEach(sub=>{
      sub.unsubscribe()
    })
  }
  private addDataToDatabase(exercise: Exercise) {
    this.db.collection("finishedExercises").add(exercise);
  }
}
