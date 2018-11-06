import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.component.html',
  styleUrls: ['./mainmenu.component.scss']
})
export class MainmenuComponent implements OnInit {

  public menuToggle = false;
  isCollapsed = true;
  public logo = "/assets/img/logo.png";

  ngOnInit() {
  }

}
