import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-adminmainmenu',
  templateUrl: './adminmainmenu.component.html',
  styleUrls: ['./adminmainmenu.component.scss']
})
export class AdminmainmenuComponent implements OnInit {

  public logo = "/assets/img/logo.png";
  public menuToggle = false;
  public logout = false;
  constructor(private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('access_token') != null)
    {
      this.logout = true;
    }
  }
  AdminLogout(){
    localStorage.removeItem('access_token');
    this.router.navigate(['/admin/home']);
  }
}
