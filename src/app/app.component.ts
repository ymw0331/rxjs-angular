import { Component, OnInit } from '@angular/core';
import { LoadingService } from './loading/loading.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    LoadingService //instance of LoadingSerivce, available to child component of reachable via applicaton component template
  ]
})
export class AppComponent implements OnInit {

  constructor() {

  }

  ngOnInit() {


  }

  logout() {

  }

}
