import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from './../../login.service';
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
  firstname;
  database;
  admin = false;
  public _subscription;
  constructor(private router: Router, private loginService: LoginService,private http: HttpClient) { 
    this.logout = loginService.login;
    this._subscription = loginService.loginChange.subscribe((value) => {this.logout = value; this.AppUpdate();});
  }

  ngOnInit() {
    if(localStorage.getItem('access_token') != null)
    {
      this.logout = true;
    }
    this.http.get('/assets/appConfig.json').subscribe(config => {
      this.database = config['database'];
      this.AppUpdate();
    });
  }
  AppUpdate()
  {
    if(localStorage.getItem('access_token') !== null)
    {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer '+ localStorage.getItem('access_token')
        })
      };
      this.http.get(this.database+"userdata?field=firstname",httpOptions)
      .subscribe(
        res => {
          console.log(res);
          
          this.firstname = res['field'];
        }
      );
      this.http.get(this.database+"userdata?field=auth",httpOptions)
      .subscribe(
        res => {
          console.log(res);
          if(res['field'] == "Administrator")
          this.admin = true;
          else
          this.admin = false;
        }
      );
    }
  }

  adminLogout(){
    console.log("Logout Successful");
    localStorage.removeItem('access_token');
    this.router.navigate(['/admin/login']);
    this.logout=true;
    this.loginService.setLogin();
  }
  ngOnDestroy() {
    //prevent memory leak when component destroyed
     this._subscription.unsubscribe();
   }
}
