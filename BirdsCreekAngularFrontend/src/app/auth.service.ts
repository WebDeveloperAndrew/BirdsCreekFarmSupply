import { DatabaseService } from './database.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router,private http: HttpClient, private db: DatabaseService) {
    db = new DatabaseService(http);
  }

  async isAuthenticated(): Promise<any>
  {
  console.log("authenticating");
  // get the auth token from localStorage
  let token = localStorage.getItem('access_token');

  // check if token is set, then...
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  //setting promise
  console.log(this.db.getDatabase());
  let promise = this.http.post(this.db.getDatabase() + "token", JSON.stringify({"jwt": token}), httpOptions).toPromise();
    return promise.then(res => {
      console.log(res);
      if(res['Authorization'] == "Accepted")
      {
        console.log("authorization completed");
        return true;
      }
      else
      {
        return false;
      }
    },
    err => {
      console.log("Error occured");
      return false;
    }
  );
}

  }
