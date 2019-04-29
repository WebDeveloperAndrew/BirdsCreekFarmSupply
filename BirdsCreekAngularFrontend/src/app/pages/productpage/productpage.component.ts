import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-productpage',
  templateUrl: './productpage.component.html',
  styleUrls: ['./productpage.component.scss']
})
export class ProductpageComponent implements OnInit {
  
  displayData:any = {'name':'loading...','subtitle':'loading...','description':'loading...','image':'loading...','info':'loading...'};
  brandData:any = {'link':'loading...', 'image':'loading...'};
  productData = {'name':'WHOLESOME ESSENTIALS™', 'subtitle':'ADULT DRY DOG FOOD PASTURE-FED LAMB & RICE RECIPE', 'img':'/assets/img/nutroproduct.png', 'description':'NUTRO™ WHOLESOME ESSENTIALS™ Adult Pasture-Fed Lamb & Rice Recipe Dog Food always starts with pasture-fed lamb as the first ingredient. This natural adult dog food provides natural fiber for healthy digestion and essential antioxidants, such as Vitamin E, for a healthy immune system, plus vitamins, minerals and other nutrients. These recipes are also crafted to promote healthy skin and a soft, shiny coat. NUTRO™ Food for Dogs also follows the THE NUTRO FEED CLEAN™ philosophy, is always made with Non-GMO* Ingredients and is made with no artificial flavors, colors or preservatives.', 'logo':'/assets/img/nutrologo.png', 'brand':'https://www.nutro.com/', 'info':'Weight: 5lb <br> Metabolizable Energy: 311 kcal/cup <br> Other Information: none'};
  database="http://localhost:4000/api/";
  id;
  
  constructor(private route: ActivatedRoute, private http: HttpClient) {}
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['productid'];
      this.findProduct();
    });
  }

  findProduct()
  {
    console.log("finding product");
    console.log(this.id);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    this.http.post(this.database+"getproduct", JSON.stringify({"id":this.id}), httpOptions)
        .subscribe(
          res => {
            console.log(res);
            this.displayData = res;
            this.findBrand();
          },
          err => {
            console.log("Error occured");
            console.log(err);
          }
        );
  }

  findBrand()
  {
    console.log("brand");
    console.log(this.displayData['brand']);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    console.log(this.displayData);
    this.http.post(this.database+"getbrand", JSON.stringify({"name":this.displayData['brand']}), httpOptions)
      .subscribe(
        res => {
          console.log(res);
          this.brandData = res;
        },
        err => {
          console.log("Error occured");
          console.log(err);
        }
      );
  }
}
