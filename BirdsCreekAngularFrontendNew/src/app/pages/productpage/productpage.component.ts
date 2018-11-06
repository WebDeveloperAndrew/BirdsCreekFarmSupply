import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-productpage',
  templateUrl: './productpage.component.html',
  styleUrls: ['./productpage.component.scss']
})
export class ProductpageComponent implements OnInit {
  
  productData = {'title':'WHOLESOME ESSENTIALS™', 'subtitle':'ADULT DRY DOG FOOD PASTURE-FED LAMB & RICE RECIPE', 'img':'/assets/img/nutroproduct.png', 'description':'NUTRO™ WHOLESOME ESSENTIALS™ Adult Pasture-Fed Lamb & Rice Recipe Dog Food always starts with pasture-fed lamb as the first ingredient. This natural adult dog food provides natural fiber for healthy digestion and essential antioxidants, such as Vitamin E, for a healthy immune system, plus vitamins, minerals and other nutrients. These recipes are also crafted to promote healthy skin and a soft, shiny coat. NUTRO™ Food for Dogs also follows the THE NUTRO FEED CLEAN™ philosophy, is always made with Non-GMO* Ingredients and is made with no artificial flavors, colors or preservatives.', 'logo':'/assets/img/nutrologo.png', 'brand':'https://www.nutro.com/', 'info':'Weight: 5lb <br> Metabolizable Energy: 311 kcal/cup <br> Other Information: none'};
  constructor(private route: ActivatedRoute) {}
  
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      console.log(params);
    });
  }

}
