import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class LoginService {
  login = false;
  loginChange: Subject<boolean> = new Subject<boolean>();
  constructor() {
    if(localStorage.getItem('access_token')!==null)
    {
      this.login = true;
    }
    else
    {
      this.login = false;
    }
   }
  setLogin()
  {
    if(localStorage.getItem('access_token')!==null)
    {
      this.login = true;
    }
    else
    {
      this.login = false;
    }
    this.loginChange.next(this.login);
  }
}
