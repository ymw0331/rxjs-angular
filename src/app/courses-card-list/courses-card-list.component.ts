import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Course } from '../model/course';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';
import { filter, tap } from 'rxjs/operators';

@Component({
  selector: 'courses-card-list',
  templateUrl: './courses-card-list.component.html',
  styleUrls: ['./courses-card-list.component.scss']
})


export class CoursesCardListComponent implements OnInit {

  // if 2 angular components at completely diff level but still intereact with each other, cannot use Input and Output
  @Input()
  courses: Course[] = [] //pass as props input

  @Output()
  private coursesChanged = new EventEmitter()

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {

  }

  editCourse(course: Course) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "400px";

    dialogConfig.data = course;

    const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);
    // CourseDialogComponent is not direct child comp of CourseCardListComponent, complete separate branch of angular comp tree

    dialogRef.afterClosed()
      .pipe(
        filter(val => !!val),
        tap(() => this.coursesChanged.emit())
      )
      .subscribe()
  }
}
