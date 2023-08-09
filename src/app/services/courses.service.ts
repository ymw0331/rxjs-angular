import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Course } from "../model/course";
import { map, shareReplay } from "rxjs/operators";


@Injectable({
    providedIn: 'root'
    // root injectable of the app, means only one instance of this service that is available to the whole service
    // making it as global singleton, only one instance
})
export class CoursesService {

    constructor(private http: HttpClient) {

    }

    // in the term of observable, if we dont subscribe to observable, nothing will happen, observable by itself will not trigger http req
    // in the case of angular http observable, everything happen in a lazy way, request to backend only get triggered if somebody is interested to sub

    loadAllCourses(): Observable<Course[]> {
        return this.http.get<Course[]>("/api/courses")
            .pipe(
                map(res => res["payload"]),//rxjs operator
                shareReplay()
                // USE shareReplay() TO AVOID CALLING MULTIPLE REQUESTS BASED ON NUMBER OF SUBSCRITPTIONS
            )
    }


    saveCourse(courseId: string, changes: Partial<Course>): Observable<any> {
        return this.http.put(`/api/courses/${courseId}`, changes)
            .pipe(
                shareReplay()
            )
    }

}