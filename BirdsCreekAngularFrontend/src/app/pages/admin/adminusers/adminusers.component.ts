import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-adminusers',
  templateUrl: './adminusers.component.html',
  styleUrls: ['./adminusers.component.scss']
})
export class AdminusersComponent implements OnInit {

  displayData= [];
  searchParam;
  content = false;
  database;

  constructor(private http: HttpClient){
  }

  runSearch()
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer '+ localStorage.getItem('access_token')
      })
    };
    this.http.post(this.database+"searchuser", JSON.stringify({"query":this.searchParam}), httpOptions)
        .subscribe(
          res => {
            this.displayData = this.convertToData(res);
          },
          err => {
            console.log("Error occured");
            console.log(err);
          }
        );
  }

  collectData()
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer '+ localStorage.getItem('access_token')
      })
    };
    this.http.post(this.database+"searchuser", JSON.stringify({"query":""}), httpOptions)
        .subscribe(
          res => {
            this.displayData = this.convertToData(res);
          },
          err => {
            console.log("Error occured");
            console.log(err);
          }
        );
  }

  convertToData(res)
  {
    var data = [];
    console.log(res.length);
    if(res.length==0)
    {
      this.content=false;
    }
    else
    {
      
      this.content=true;
    }
    console.log(this.content);
    for(var i = 0; i <res.length;i++)
      data.push(res[i]);
    console.log(data);
    return data;
  }
  ngOnInit() {
    this.http.get('/assets/appConfig.json').subscribe(config => {
      this.database = config['database'];
      this.collectData();
    });
    
  }
}
