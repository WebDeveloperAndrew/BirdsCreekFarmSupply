import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../seo.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(private seo: SeoService) { }

  ngOnInit() {
    this.seo.generateTags({
      title: 'Home Page',
      description: 'A family-owned farm supply business in Birds Creek just north of Bancroft, Ontario',
      image: 'assets/img/logo.jpg',
      slug: 'home',
    })
  }

}
