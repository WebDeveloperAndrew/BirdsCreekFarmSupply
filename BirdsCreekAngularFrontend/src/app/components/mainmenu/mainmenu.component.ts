import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.component.html',
  styleUrls: ['./mainmenu.component.scss']
})
export class MainmenuComponent implements OnInit {

  constructor(private http: HttpClient) { }
  
  database="http://localhost:4000/api/"
  products="false";
  public menuToggle = false;
  isCollapsed = true;
  public logo = "/assets/img/logo.png";
  
  ngOnInit() {
    this.http.get(this.database+"gethomesettings")
    .subscribe(
      res => {
        console.log(res);
        this.products = res['products'];
      }
    );
  }

}
