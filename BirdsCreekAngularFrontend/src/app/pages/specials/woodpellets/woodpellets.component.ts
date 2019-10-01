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
  subtitle = "In stock now, wood pellets for all your heating season needs. Soft wood Hard wood and Blended pellets.";
  pellets = '/assets/img/pellets.jpg';
  ngOnInit() {
    this.seo.generateTags({
      title: 'Woodpellets Page',
      description: 'In stock now, wood pellets for all your heating season needs. Soft wood Hard wood and Blended pellets.',
      image: 'assets/img/pellets.jpg',
      slug: 'pellets'
    })
  }
}
