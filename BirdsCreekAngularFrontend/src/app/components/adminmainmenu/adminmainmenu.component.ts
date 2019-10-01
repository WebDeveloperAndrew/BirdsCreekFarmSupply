import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adminmainmenu',
  templateUrl: './adminmainmenu.component.html',
  styleUrls: ['./adminmainmenu.component.scss']
})
export class AdminmainmenuComponent implements OnInit {

  public logo = "/assets/img/logo.png";
  public menuToggle = false;
  constructor() { }

  ngOnInit() {
  }

}
