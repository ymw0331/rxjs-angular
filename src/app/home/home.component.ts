import { Component, OnInit } from '@angular/core';
import { Course, sortCoursesBySeqNo } from '../model/course';
import { interval, noop, Observable, of, throwError, timer } from 'rxjs';
import { catchError, delay, delayWhen, filter, finalize, map, retryWhen, shareReplay, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';
import { CoursesService } from '../services/courses.service';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

// main logic of HomeComponent, access to service layer, extract data from it and pass it to card-list component
export class HomeComponent implements OnInit {

  // mutable state variable changed to observable
  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;

  constructor(
    // private http: HttpClient, // moved to CoursesService
    private coursesService: CoursesService) {
  }

  ngOnInit() { // never call ngOnInit directly from anywhere from the component
    this.reloadCourses()
  }


  // reloadCourses fired in case new changes made to reflect
  reloadCourses() {

    // Place this logic in an angular service where it can be reused by other component

    // Observable allow us to observe its behavior ovetime by subscribing its observable, observable might emit multiple value or not emit any value at all, during its lifecycle, we can receive the event emitted by observable by this callback, or might end its lifecycle

    // this.http.get('/api/courses')
    //   .subscribe(
    //     res => {
    //       // emit one value here when get reply from backend arrives, this function get called
    //       const courses: Course[] = res["payload"].sort(sortCoursesBySeqNo);
    //       // extract the payload prop and sort courses using sortCourseBySeqNo function
    //       this.beginnerCourses = courses.filter(course => course.category == "BEGINNER");
    //       this.advancedCourses = courses.filter(course => course.category == "ADVANCED");
    //     });

    // add $ at end of observable to distinguish those which is not
    // observable that we want to return here should trigger the request only once
    const courses$ = this.coursesService.loadAllCourses()
      .pipe(
        map(courses => courses.sort(sortCoursesBySeqNo))
      )

    // using map operator, we can derive 2 separated observables
    // results to be separated up 2 observables (it needed to be fixed, because http request should be called only once )

    // to solve calling http req twice, instead of calling http req per subscription, we keep the result of http request in memory, then share the result to subsequent subscriber without trigering a new http request (WE CAN USE shareReplay in courses.service)
    // courses$.subscribe(val => console.log(val))

    // 1st subscription
    this.beginnerCourses$ = courses$
      .pipe(
        map(courses => courses.filter(course => course.category == "BEGINNER"))
      )

    // 2nd subscription
    this.advancedCourses$ = courses$
      .pipe(
        map(courses => courses.filter(course => course.category == "ADVANCED"))
      )
  }
}




