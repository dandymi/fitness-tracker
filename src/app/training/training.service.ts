import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { UIService } from '../shared';

@Injectable()
export class TrainingService {

  private availableExercisesColl: AngularFirestoreCollection<Exercise>;
  private runningExercise: Exercise;

  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();
  exercises: Observable<Exercise[]>;
  esercizi: AngularFireList<Exercise[]>;
  retExercises: Exercise[] = [];
  private fbSubs: Subscription[] = [];

  constructor(
    private afs: AngularFirestore,
    private db: AngularFireDatabase,
    private uiService: UIService) {
      this.availableExercisesColl = this.afs.collection<Exercise>('availableExercises');
      // this.esercizi = this.db.list('/availableExercises');
  }

  fetchAvailableExercises(): Exercise[] {
    this.uiService.loadingStateChanged.next(true);
    this.exercises = this.availableExercisesColl.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Exercise;
        const id = a.payload.doc.id;
        return { id, ...data};
      }))
    );
    // this.esercizi.valueChanges().subscribe(exercises => console.log('List: ' + exercises));
    this.fbSubs.push(this.exercises.subscribe((exercises: Exercise[]) => {
      this.uiService.loadingStateChanged.next(false);
      this.retExercises = exercises;
      this.exercisesChanged.next(this.retExercises.slice());
    }));
    return this.retExercises;
  }

  startExercise(selectedId: string) {
    this.availableExercisesColl.ref.where('id', '==', selectedId).limit(1).get()
        .then(ex => {
          this.runningExercise = (ex[0] as Exercise);
          this.retExercises.push(this.runningExercise);
        });
      this.exercises.subscribe(exercises => {
        exercises.push(this.runningExercise);
        this.retExercises.push(this.runningExercise);
        this.exercisesChanged.next(this.retExercises.slice());
      });
  }

  completeExercise() {
    this.retExercises.push({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'});
    this.runningExercise = null;
    this.exercisesChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.retExercises.push({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'});
    this.runningExercise = null;
    this.exercisesChanged.next(null);
  }

  getRunningExercise() {
    return {...this.runningExercise};
  }

  fetchCompletedOrCancelledExercises() {
    this.fbSubs.push(
      this.afs.collection('finishedExercises')
      .valueChanges()
      .subscribe((exercises: Exercise[]) => {
        this.retExercises = exercises;
        this.finishedExercisesChanged.next(exercises);
      })
    );
    return this.retExercises.slice();
  }

  cancelSubscriptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }

  private addDataToDatabase(exercise: Exercise) {
    this.afs.collection('finishedExercises').add(exercise);
  }
}
