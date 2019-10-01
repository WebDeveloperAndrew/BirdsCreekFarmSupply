import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../../seo.service';


@Component({
  selector: 'app-winterfootware',
  templateUrl: './winterfootware.component.html',
  styleUrls: ['./winterfootware.component.scss']
})
export class WinterfootwareComponent implements OnInit {

  constructor(private seo: SeoService) { }
  title = "Winter Footware";
  subtitle = "Protect your feet this winter with our wide selection of quality boots.";
  mainimage = '/assets/img/winterfootware.png';
  ngOnInit() {
    this.seo.generateTags({
      title: 'Winter Footware',
      description: "Protect your feet this winter with our wide selection of quality boots.",
      image: 'assets/img/winterfootware.png',
      slug: 'footware'
    })
  }
}