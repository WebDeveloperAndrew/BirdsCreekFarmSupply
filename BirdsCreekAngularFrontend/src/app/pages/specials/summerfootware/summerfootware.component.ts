import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../../seo.service';

@Component({
  selector: 'app-summerfootware',
  templateUrl: './summerfootware.component.html',
  styleUrls: ['./summerfootware.component.scss']
})
export class SummerfootwareComponent implements OnInit {

  constructor(private seo: SeoService) { }
  title = "Summer Footware";
  subtitle = "Protect your feet this summer with our wide selection of quality boots.";
  mainimage = '/assets/img/summerfootware.jpg';
  ngOnInit() {
    this.seo.generateTags({
      title: 'Summer Footware Page',
      description: "Protect your feet this summer with our wide selection of quality boots.",
      image: 'assets/img/summerfootware.jpg',
      slug: 'footware'
    })
  }
}