import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-adminproducts',
  templateUrl: './adminproducts.component.html',
  styleUrls: ['./adminproducts.component.scss']
})
export class AdminproductsComponent implements OnInit {

  displayData= [];
  searchParam;
  content = false;
  productData = {'title':'WHOLESOME ESSENTIALS™', 'subtitle':'ADULT DRY DOG FOOD PASTURE-FED LAMB & RICE RECIPE', 'image':'/assets/img/nutroproduct.png', 'description':'NUTRO™ WHOLESOME ESSENTIALS™ Adult Pasture-Fed Lamb & Rice Recipe Dog Food always starts with pasture-fed lamb as the first ingredient. This natural adult dog food provides natural fiber for healthy digestion and essential antioxidants, such as Vitamin E, for a healthy immune system, plus vitamins, minerals and other nutrients. These recipes are also crafted to promote healthy skin and a soft, shiny coat. NUTRO™ Food for Dogs also follows the THE NUTRO FEED CLEAN™ philosophy, is always made with Non-GMO* Ingredients and is made with no artificial flavors, colors or preservatives.', 'logo':'/assets/img/nutrologo.png', 'brand':'https://www.nutro.com/', 'info':'Weight: 5lb <br> Metabolizable Energy: 311 kcal/cup <br> Other Information: none'};
  pets = '/assets/img/pets.jpg';
  farm = '/assets/img/farmsupplies.jpg';
  construction = '/assets/img/construction.jpg';
  garden = '/assets/img/garden.jpg';
  database;

  constructor(private http: HttpClient){
  }

  runSearch()
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    this.http.post(this.database+"searchproduct", JSON.stringify({"query":this.searchParam}), httpOptions)
        .subscribe(
          res => {
            this.displayData = this.convertToData(res);
          },
          err => {
            console.log("Error occured");
            console.log(err);
          }
        );
  }

  collectData()
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    this.http.post(this.database+"searchproduct", JSON.stringify({"query":""}), httpOptions)
        .subscribe(
          res => {
            this.displayData = this.convertToData(res);
          },
          err => {
            console.log("Error occured");
            console.log(err);
          }
        );
  }

  convertToData(res)
  {
    var data = [];
    if(res.length==0)
    {
      this.content=false;
    }
    else
    {
      
      this.content=true;
    }
    console.log(this.content);
    for(var i = 0; i <res.length;i++)
      data.push(res[i]);
    console.log(data);
    return data;
  }

  ngOnInit() {
    this.http.get('/assets/appConfig.json').subscribe(config => {
      this.database = config['database'];
      this.collectData();
    });
    
  }

}
