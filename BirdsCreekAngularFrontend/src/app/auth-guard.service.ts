import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

    base_url: string;

    constructor(private router: Router,private http: HttpClient, private authService: AuthService) 
    {
      
    }

    canActivate(){
        if(localStorage.getItem("access_token") != null)
        {
            // Check to see if a user has a valid token
            this.authService.isAuthenticated().then((value)=>{
                if(value == true)
                {
                    console.log("authorized");
                    // If they do, return true and allow the user to load app
                    return true;
                }
                else
                {
                    console.log("go to login page");
                    // If not, they redirect them to the login page
                    this.router.navigate(['/admin/login']);
                    return false;
                }
            });
        }
        else
        {
            this.router.navigate(['/admin/login']);
            return false;
        }

    
    return true;
    }
}