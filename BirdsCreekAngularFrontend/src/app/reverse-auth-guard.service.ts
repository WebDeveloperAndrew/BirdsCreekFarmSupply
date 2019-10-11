import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class ReverseAuthGuardService implements CanActivate {

    base_url: string;

    constructor(private router: Router, private authService: AuthService) {}

    canActivate() 
    {
        if(localStorage.getItem("access_token") != null)
        {
        // Check to see if a user has a valid token
            this.authService.isAuthenticated().then((value)=>{
                if(value == true)
                {
                    this.router.navigate(['/admin/home']);
                    return false;
                }
                else
                {
                    return true;
                }
            });
        }
        
        else
        {
            return true;
        }
    }
}
