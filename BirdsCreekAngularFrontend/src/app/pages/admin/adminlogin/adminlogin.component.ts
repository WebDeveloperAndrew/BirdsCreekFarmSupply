import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  constructor(private http: HttpClient) { }

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
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
      event.preventDefault();
      this.loginerror=false;
      this.passworderror=false;
      this.passwordlengtherror=false;
      this.http.post(this.loginServer+"login", JSON.stringify({"login": login.value.login, "password": login.value.password}), httpOptions)
      .subscribe(
        res => {
          console.log(res);
          login.form.reset();
          if(true == true)
          {
            this.loginsuccessful=true;
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


