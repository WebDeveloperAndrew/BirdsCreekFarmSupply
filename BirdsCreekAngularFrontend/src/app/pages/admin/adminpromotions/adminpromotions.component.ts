import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-adminpromotions',
  templateUrl: './adminpromotions.component.html',
  styleUrls: ['./adminpromotions.component.scss']
})
export class AdminpromotionsComponent implements OnInit {

  constructor(private http: HttpClient) { }
  chicks = '/assets/img/chickspromo.jpg';
  pellets = '/assets/img/pellets.jpg';
  summerfootwear = '/assets/img/summerfootware.jpg';
  winterfootwear = '/assets/img/winterboots.png';
  database="http://localhost:4000/api/"
  promotions = [
    {"name":"spring","image": this.chicks, "selected": ""},
    {"name":"summer","image": this.summerfootwear, "selected": ""},
    {"name":"autumn","image": this.pellets, "selected": ""},
    {"name":"winter","image": this.winterfootwear, "selected": ""}
  ];
  currentPromotion = this.promotions[0];
  selected = this.promotions[0];
  ngOnInit() {
    this.http.get(this.database+"getpromotions")
    .subscribe(
      res => {
        console.log(res);
        console.log(res['promotion']);
        
        for(var i = 0; i < this.promotions.length; i++)
        {
          console.log(this.promotions[i].name);
          console.log(this.promotions[i].name == res['promotion']);
          if(this.promotions[i].name == res['promotion'])
          {
            this.currentPromotion = this.promotions[i];
            this.selected = this.promotions[i];
            this.selectPromotion(this.promotions[i]);
            i=100;
          }
        }
      }
    );
  }
  selectPromotion(promotion)
  {
    console.log(promotion);
    for(var i = 0; i < this.promotions.length; i++)
    {
      this.promotions[i].selected = "";
    }
    promotion.selected = "selected";
    this.selected = promotion;
  }

  changePromotion()
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    this.currentPromotion = this.selected;
    const req = this.http.post(this.database + "setpromotion", JSON.stringify({"promotion":this.selected.name}), httpOptions)
        .subscribe(
          res => {
            console.log(res);
          },
          err => {
            console.group('Error Information');
              console.log("Error occured");
            console.groupEnd();
          }
        );
  }
}