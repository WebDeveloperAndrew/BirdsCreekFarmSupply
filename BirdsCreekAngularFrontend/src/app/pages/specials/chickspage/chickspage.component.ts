import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../../seo.service';

@Component({
  selector: 'app-chickspage',
  templateUrl: './chickspage.component.html',
  styleUrls: ['./chickspage.component.scss']
})
export class ChickspageComponent implements OnInit {

  constructor(private seo: SeoService) { }
  title = "Poultry Pricing and Delivery Schedules";
  subtitle = "Chicks, Turkeys, Ducks, Pheasants";
  chicks = '/assets/img/chicks.jpg';
  price = '/assets/files/2019-Delivery-Schedule.pdf';
  delivery = '/assets/img/delivery.jpg';
  schedule = '/assets/files/2019-Delivery-Schedule.pdf';
  ngOnInit() {
    this.seo.generateTags({
      title: 'Chicks Page',
      description: 'Chicks, Turkeys, Ducks, and Pheasants, place your orders early to avoid disappointment',
      image: 'assets/img/chicks.jpg',
      slug: 'chicks'
    })
  }

}
