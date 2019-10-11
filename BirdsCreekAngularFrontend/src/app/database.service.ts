import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  database="https://backend.birdscreekfarmsupply.ca/api/";

  constructor(private http: HttpClient) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer '+ localStorage.getItem('access_token')
      })
    };
    this.http.get('/assets/appConfig.json').subscribe((config) => {this.database = config["database"];});
   }
  getDatabase()
  {
    return this.database;
  }
}
