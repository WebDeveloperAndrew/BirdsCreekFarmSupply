import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.scss']
})
export class AdminloginComponent implements OnInit {

  loginsuccessful=false;
  loginfailed=false;
  loginunsuccessful=false;
  loginerror=false;
  passworderror=false;
  passwordlengtherror=false;
  loginServer;

  constructor(private router: Router,private http: HttpClient) { }

  ngOnInit() {
    this.http.get('/assets/appConfig.json').subscribe(config => {
      this.loginServer = config['database'];
    });
  }

  onSubmit(login){
    this.loginfailed=false;
    this.loginunsuccessful=false;
    this.loginsuccessful=false;
    console.log(login);
    if(login.value.login != "" && login.value.password != "" && login.value.password.length >= 8)
    {
      console.log(login.value.password.length);
      event.preventDefault();
      this.loginerror=false;
      this.passworderror=false;
      this.passwordlengtherror=false;
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
      const req = this.http.post(this.loginServer + "login", JSON.stringify({"login": login.value.login, "password": login.value.password}), httpOptions)
      .subscribe(
        res => {
          console.log(res);
          login.form.reset();
          if(res['Status'] == "Login Successful")
          {
            localStorage.setItem('access_token',res['JWT']);
            this.router.navigate(['/admin/home']);
          }
          else
          {
            this.loginunsuccessful=true;
          }
        },
        err => {
          console.log("Error occured");
          this.loginfailed=true;
        }
      );
    }
    else
    {
      console.log("errorlogging");
      console.log(login.value.password);
      console.log(login.value.password == "");
      console.log(login.value.password.length < 8);
      if(login.value.login == "")
      {
        this.loginerror=true;
      }
      else
      {
        this.loginerror=false;
      }
      if(login.value.password == "")
      {
        this.passworderror=true;
      }
      else if(login.value.password.length < 8)
      {
        
        this.passworderror=false;
        this.passwordlengtherror=true;
      }
      else
      {
        this.passworderror=false;
        this.passwordlengtherror=false;
      }
    }
  }
}


