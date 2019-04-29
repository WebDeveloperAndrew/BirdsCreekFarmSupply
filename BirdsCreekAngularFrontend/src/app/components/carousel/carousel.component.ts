import { Component, OnInit } from '@angular/core';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser} from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  slide = {id:1,imageSource: '/assets/img/chick.jpg', slideTitle: "Chicks Here Now", slideText:"We don't want to ruffle any feathers, but it's time to order your", buttonText: "Chicks!", link: "chicks"};
  slideTimeout;
  testBrowser: boolean;
  database="http://localhost:4000/api/"

  constructor(@Inject(PLATFORM_ID) platformId: string, private http: HttpClient) {
      this.testBrowser = isPlatformBrowser(platformId);
      if (this.testBrowser) {
        console.log('settingTimeout');
        this.slideTimeout = setTimeout(() => this.slideMove(), 14000);
      }
    }
  Circle = faCircle;

  public slides = [
    {id:1,imageSource: '/assets/img/chick.jpg', slideTitle: "Chicks Here Now", slideText:"We don't want to ruffle any feathers, but it's time to order your", buttonText: "Chicks!", link: "chicks"},
    {id:2,imageSource: '/assets/img/pets.jpg', slideTitle: "Pet Food & Supplies", slideText:"We want your pets to be safe, healthy, and happy", buttonText: "Pet Food", link: "products"},
    {id:3,imageSource: '/assets/img/garden.jpg', slideTitle: "Lawn & Garden Supplies", slideText:"We can help ensure you have the right soils, fertilizers, and greenhouses", buttonText: "Lawn & Garden", link: "products"},
    {id:4,imageSource: '/assets/img/construction.jpg', slideTitle: "Work & Safety Supplies", slideText:"We provide a large selection of items including hardware, wood pellet, and work-wear", buttonText: "Safety & Work Wear", link:"products"},
    {id:5,imageSource: '/assets/img/farmsupplies.jpg', slideTitle: "Farm Supplies", slideText:"Farming Supplies including feed, fences, poultry, horse tack, tools, clothing, and animal health care", buttonText: "Farm Supplies", link: "products"}
 ];


  moveSlide(id)
  {
    this.slide =  this.slides.find(x => x.id == id);
    clearTimeout(this.slideTimeout);
    this.slideTimeout = setTimeout(() => this.slideMove(), 8000);
  }

  slideMove()
  {
    if(this.slide.id < this.slides.length)
      this.slide = this.slides.find(x => x.id == this.slide.id+1);
    else
    {
      this.slide = this.slides.find(x => x.id == 1);
    }
    clearTimeout(this.slideTimeout);
    this.slideTimeout = setTimeout(() => this.slideMove(), 6000);
  }

  setPromotion(promotion)
  {
    console.log(promotion);
    if (promotion === "summer")
    {
      this.slides[0] = {id:1,imageSource: '/assets/img/summerfootware.jpg', slideTitle: "Summer Footware", slideText:"Protect your feet with our wide selection of", buttonText: "Work Boots", link: "summerfootware"};
      this.slide = {id:1,imageSource: '/assets/img/summerfootware.jpg', slideTitle: "Summer Footware", slideText:"Protect your feet this work season with our wide selection of", buttonText: "Work Boots!", link: "summerfootware"};
    }
    else if (promotion === "autumn")
    {
      this.slides[0] = {id:1,imageSource: '/assets/img/pellets.jpg', slideTitle: "Pellets On Sale", slideText:"Don't be caught in the cold this winter, heat your home with our selection of", buttonText: "Wood Pellets!", link: "woodpellets"};
      this.slide =  {id:1,imageSource: '/assets/img/pellets.jpg', slideTitle: "Pellets On Sale", slideText:"Don't be caught in the cold this winter, heat your home with our selection of", buttonText: "Wood Pellets!", link: "woodpellets"};
    }
    else if (promotion === "winter")
    {
      this.slides[0] = {id:1,imageSource: '/assets/img/winterboots.png', slideTitle: "Winter Footware", slideText:"Protect your feet this winter with our wide selection of", buttonText: "Winter Boots!", link: "winterfootware"};
      this.slide = {id:1,imageSource: '/assets/img/winterboots.png', slideTitle: "Winter Footware", slideText:"Protect your feet this winter with our wide selection of", buttonText: "Winter Boots!", link: "winterfootware"};
    }
    else
    {
      this.slides[0] = {id:1,imageSource: '/assets/img/chick.jpg', slideTitle: "Chicks Here Now", slideText:"We don't want to ruffle any feathers, but it's time to order your", buttonText: "Chicks!", link: "chicks"};
    }
  }

  ngOnInit() {
    this.http.get(this.database+"getpromotions")
    .subscribe(
      res => {
        console.log(res);
        console.log(res['promotion']);
        this.setPromotion(res['promotion']);
      }
    );
  }

}
