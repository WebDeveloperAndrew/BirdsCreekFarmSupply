import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../seo.service';

@Component({
  selector: 'app-productspage',
  templateUrl: './productspage.component.html',
  styleUrls: ['./productspage.component.scss']
})
export class ProductspageComponent implements OnInit {

  constructor(private seo: SeoService) { }

  pets = '/assets/img/pets.jpg';
  farm = '/assets/img/farmsupplies.jpg';
  construction = '/assets/img/construction.jpg';
  garden = '/assets/img/garden.jpg';

  ngOnInit() {
    this.seo.generateTags({
      title: 'Products Page',
      description: 'We carry awesome food products, accessories and care products for your pets.',
      image: 'assets/img/pets.jpg',
      slug: 'products'
    })
  }

}
