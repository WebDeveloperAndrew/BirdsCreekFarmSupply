import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-adminbrands',
  templateUrl: './adminbrands.component.html',
  styleUrls: ['./adminbrands.component.scss']
})
export class AdminbrandsComponent implements OnInit {

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
        'Content-Type':  'application/json'
      })
    };
    this.http.post(this.database+"searchbrand", JSON.stringify({"query":this.searchParam}), httpOptions)
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
        'Content-Type':  'application/json'
      })
    };
    this.http.post(this.database+"searchbrand", JSON.stringify({"query":""}), httpOptions)
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
