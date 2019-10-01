import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../../seo.service';

@Component({
  selector: 'app-woodpellets',
  templateUrl: './woodpellets.component.html',
  styleUrls: ['./woodpellets.component.scss']
})
export class WoodpelletsComponent implements OnInit {

  constructor(private seo: SeoService) { }
  title = "Woodpellets";
  subtitle = "Don't be caught in the cold this winter, heat your home with our selection of wood pellets for all your heating season needs. Softwood, Hardwood, and Blended pellets are all avaliable now!";
  mainimage = '/assets/img/pellets2.jpg';
  ngOnInit() {
    this.seo.generateTags({
      title: 'Woodpellets Page',
      description: "Don't be caught in the cold this winter, heat your home with our selection of wood pellets for all your heating season needs. Softwood, Hardwood, and Blended pellets are all avaliable now!",
      image: 'assets/img/pellets2.jpg',
      slug: 'pellets'
    })
  }
}
