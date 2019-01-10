import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'birdscreekfarmsupply';
  admin = false;
  constructor(private router:Router) {
    router.events.subscribe(event => {

      if (event instanceof NavigationEnd ) {
        if(event.url.split('/')[1] == 'admin')
        {
          console.log('Admin Mode is active');
          this.admin = true;
        }
        
      }
    });
  }
  ngOnInit()
  {
    
  }

}
