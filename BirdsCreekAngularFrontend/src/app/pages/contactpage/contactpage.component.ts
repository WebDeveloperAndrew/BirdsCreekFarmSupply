import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { SeoService } from '../../seo.service';


@Component({
  selector: 'app-contactpage',
  templateUrl: './contactpage.component.html',
  styleUrls: ['./contactpage.component.scss']
})

export class ContactpageComponent implements OnInit {

  mailfail=false;
  mailsent=false;
  emailerror=false;
  nameerror=false;
  messageerror=false;
  mailer;

  emailCheck(email)
  {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
  }

  constructor(private http: HttpClient, private seo: SeoService){
  }
  
  ngOnInit() {
    this.http.get('/assets/appConfig.json').subscribe(config => {
      this.mailer = config['mailer'];
    });
    this.seo.generateTags({
      title: 'Contact Page',
      description: 'Call us at (613) 332-1516 or visit us at 29815 Hwy 62 North, Bancroft, ON. K0L 1C0',
      image: 'assets/img/logo.jpg',
      slug: 'contact'
    })
  }
  public onSubmit(content) {
    this.mailsent=false;
    if(content.value.name != "" && content.value.message != "" && this.emailCheck(content.value.email))
    {
      this.nameerror=false;
      this.emailerror=false;
      this.messageerror=false;
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
      event.preventDefault();
      console.log(content.value);
      const req = this.http.post(this.mailer, JSON.stringify({"name": content.value.name, "email": content.value.email, "message": content.value.message}), httpOptions)
        .subscribe(
          res => {
            console.log(res);
            content.form.reset();
            this.mailsent=true;
          },
          err => {
            console.log("Error occured");
            this.mailfail=true;
          }
        );

    }
    else
    {
      if(content.value.name == "")
      {
        this.nameerror=true;
      }
      if(content.value.message == "")
      {
        this.messageerror=true;
      }
      if(!this.emailCheck(content.value.email))
      {
        this.emailerror=true;
      }
    }
  }
}
