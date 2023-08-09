import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingService } from './loading.service';

@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})

// by using observable and comsuming it in template, means loading component compoletely unaware of how rest of angular app structured (HomeComponent, EditCourseComponent)
export class LoadingComponent implements OnInit {

  // inject loadingService
  constructor(
    public loadingService: LoadingService //make it accessible by the template of the component
  ) {

  }

  ngOnInit() {

  }


}
