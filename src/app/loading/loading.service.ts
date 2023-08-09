import { BehaviorSubject, Observable, of } from 'rxjs';
import { Injectable } from "@angular/core";
import { concatMap, finalize, tap } from 'rxjs/operators';
// add injectable to be a angular service, with default declaration
// not making it as singleton, as it might have potential multiple instances in the app

// public api
@Injectable()
export class LoadingService {

    // to define custom observable, we need rxjs subject, in the sense we can subscribe to a subject with extra capability of emitting value
    // with observable only have subscribe method but no way to control the value emitted by observable
    private loadingSubject = new BehaviorSubject<boolean>(false);
    // BS special type of subject, rmb last value emitted by the subject, better for async, we dont know

    // loading observable of type boolean (true:show or false:hide)
    loading$: Observable<boolean> = this.loadingSubject.asObservable();

    constructor() {
        console.log("Loading service created ...")
    }

    showLoaderUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
        // create another initial observable, factory method of()
        return of(null) //default observable in order to create an observable chain
            .pipe(
                tap(() => this.loadingOn()), // when received initial value, start by turning on loading indicator 
                concatMap(() => obs$), // then switch to outputting value emitted by input obs$
                finalize(() => this.loadingOff()) // when input obs$ stop emitting any value or complete, finalize and turn off loading indicator
            )


    }

    loadingOn() {
        // loading Subject private to make it not other part of comp sub to it
        this.loadingSubject.next(true)  //emit new value true (to show loading )
        // next() operator provide us to to emit new value for the subject, if other part of comp subs to the subject, they tempted to use next() to emit new value, thats why avoid that making it private 
        // only LoadingService should have control over the ability of emitting the value

    }

    loadingOff() {
        this.loadingSubject.next(false)  //emit new value true (to hide loading)
    }
}