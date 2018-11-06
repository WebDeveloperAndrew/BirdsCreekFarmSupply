import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../seo.service';

@Component({
  selector: 'app-aboutpage',
  templateUrl: './aboutpage.component.html',
  styleUrls: ['./aboutpage.component.scss']
})
export class AboutpageComponent implements OnInit {

  constructor(private seo: SeoService) { }

  public storefront = "/assets/img/storefront.jpg";
  public history = "/assets/img/history.jpg";
  public penny = "/assets/img/Penny.jpg";
  public jenise = "/assets/img/Jenise.jpg";

  ngOnInit() {
    this.seo.generateTags({
      title: 'About Page',
      description: 'Birds Creek Farm Supply specializes in both farming and pet supplies.',
      image: 'assets/img/storefront.jpg',
      slug: 'about'
    })
  }

}
