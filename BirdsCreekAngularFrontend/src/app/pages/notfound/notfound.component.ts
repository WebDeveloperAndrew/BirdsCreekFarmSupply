import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss']
})
export class NotfoundComponent implements OnInit {

  public sadpup = "/assets/img/sad_puppy.jpg";
  constructor() { }

  ngOnInit() {
    setTimeout((router: Router) => {
      router.navigate(['home']);
  }, 5000);  //5s
  }

}
