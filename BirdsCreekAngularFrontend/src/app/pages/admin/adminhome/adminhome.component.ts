import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.scss']
})
export class AdminhomeComponent implements OnInit {

  constructor(private http: HttpClient) { }
  database="http://localhost:4000/api/"
  products="false";
  ngOnInit() {
    this.http.get(this.database+"gethomesettings")
    .subscribe(
      res => {
        console.log(res);
        this.products = res['products'];
      }
    );
  }
  changeSettings()
  {
    console.log('changing settings');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    const req = this.http.post(this.database + "sethomesettings", JSON.stringify({"products":this.products}), httpOptions)
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.group('Error Information');
            console.log("Error occured");
          console.groupEnd();
        }
      );
    }
}
