import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Course } from "../model/course";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import * as moment from 'moment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { CoursesService } from '../services/courses.service';
import { LoadingService } from '../loading/loading.service';

@Component({
    selector: 'course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css'],
    providers: [
        LoadingService
    ]
    // give it its own instance of LoadingService constructor function, allow DI to create locally at the level of component a new instance of LoadingService that can be injected here in constructor of CourseDialog
})
export class CourseDialogComponent implements AfterViewInit {

    form: FormGroup;

    course: Course;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CourseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) course: Course,
        private coursesService: CoursesService,
        private loadingService: LoadingService
    ) {
        // completely diff component tree than home component, loadingService is not accessble by CourseDialogComponent, it is not direct descendant of app.component root
        this.course = course;

        this.form = fb.group({
            description: [course.description, Validators.required],
            category: [course.category, Validators.required],
            releasedAt: [moment(), Validators.required],
            longDescription: [course.longDescription, Validators.required]
        });

        // this.loadingService.loadingOn()

    }

    ngAfterViewInit() {

    }

    save() {


        const changes = this.form.value;

        const saveCourse$ = this.coursesService.saveCourse(this.course.id, changes)

        this.coursesService.saveCourse(this.course.id, changes)
            .subscribe(
                val => {
                    this.dialogRef.close(val)
                }
            )

    }

    close() {
        this.dialogRef.close();
    }

}
