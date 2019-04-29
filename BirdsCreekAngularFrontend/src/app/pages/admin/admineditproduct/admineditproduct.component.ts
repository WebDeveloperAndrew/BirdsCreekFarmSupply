import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-admineditproduct',
  templateUrl: './admineditproduct.component.html',
  styleUrls: ['./admineditproduct.component.scss']
})
export class AdmineditproductComponent implements OnInit {

  database="http://localhost:4000/api/";
  loaded = false;
  title="";
  titlex="";
  subtitle="";
  id="";
  description="";
  info="";
  brand="";
  price="";
  loadingerr=false;
  imageupload = '/assets/img/placeholder.png';
  oldimage = '';
  titleerror=false;
  brands = false;
  brandData = [];
  imageerror=false;
  infoerror=false;
  subtitleerror=false;
  descriptionerror=false;
  submitted=false;
  uploaded=false;
  uploading = false;
  selectedFile: File = null;
  imageDatabase="http://localhost:4000/api/imageserver/upload";

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}
  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params['productid']);
      this.findProduct(params['productid']);
      this.collectData();
    });
  }

  collectData()
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    this.http.post(this.database+"searchbrand", JSON.stringify({"query":""}), httpOptions)
    .subscribe(
      res => {
        this.brandData = this.convertToData(res);
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
      this.brands=false;
    }
    else
    {
      
      this.brands=true;
    }
    for(var i = 0; i <res.length;i++)
      data.push(res[i]);
    console.log(data);
    return data;
  }

  deleteProduct()
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    this.http.post(this.database+"deleteproduct", JSON.stringify({"id":this.id,"title":this.titlex}), httpOptions)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/admin/products']);
        },
        err => {
          console.log("Error occured");
          this.loadingerr = true;
          console.log(err);
        }
      );
  }

  findProduct(id)
  {
    console.log("finding product");
    console.log(id);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    this.http.post(this.database+"getproduct", JSON.stringify({"id":id}), httpOptions)
        .subscribe(
          res => {
            console.log(res);
            this.setProductFields(res);
            this.loaded = true;
            this.id = id;
          },
          err => {
            console.log("Error occured");
            console.log(err);
          }
        );
  }
  imageUpload(event)
  {
    if(event.target.files[0])
    {
      this.selectedFile = event.target.files[0];
      this.uploading = true;

      const httpOptions = {
        headers: new HttpHeaders({
          'content-Type':  'multipart/form-data'
        })
      };
      const fd = new FormData();
      fd.append('image', this.selectedFile, this.selectedFile.name);
      if(this.oldimage)
        fd.append('oldimage',this.oldimage);
        
      this.http.post(this.imageDatabase, fd)
          .subscribe(res => {
            console.group('Upload Information');
              console.log(res);
            console.groupEnd();
            this.uploading = false;
            this.uploaded = true;
            this.imageupload = 'http://localhost:4000'+ res['image'];
            this.imageerror=false;
            this.oldimage = res['filename'];
          });
    }
  }
  public onSubmit(content) {
    this.titleerror=false;
    this.imageerror=false;
    this.submitted=false;
    this.subtitleerror=false;
    this.descriptionerror=false;
    if(content.value.title != "" && content.value.subtitle != "" && content.value.description != "" && content.value.title && content.value.subtitle && content.value.description)
    {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
      event.preventDefault();
      console.log(content.value);
      console.log(this.titlex);
      const req = this.http.post(this.database + "updateproduct", JSON.stringify({"id":this.id, "title": content.value.title, "image": this.imageupload, "subtitle": content.value.subtitle, "description": content.value.description, "info": content.value.info, "price": content.value.price, "brand": content.value.brand}), httpOptions)
        .subscribe(
          res => {
            if(res['title'] == "MongoError")
            {
              console.group('Error Information');
                console.error(res);
              console.groupEnd();
            }
            else
            {
              console.group('Upload Information');
              console.log(res);
              console.groupEnd();
              this.submitted=true;
            }
          },
          err => {
            console.group('Error Information');
              console.log("Error occured");
            console.groupEnd();
          }
        );
    }
    else
    {
      if(content.value.title == "" || content.value.title == null)
      {
        this.titleerror=true;
      }
      if(content.value.subtitle == "" || content.value.subtitle == null)
      {
        this.subtitleerror=true;
      }
      if(content.value.description == "" || content.value.description == null)
      {
        this.descriptionerror=true;
      }
      if(content.value.info == "" || content.value.info == null)
      {
        this.infoerror=true;
      }
    }
  }

  public setProductFields(data)
  {
    console.log(data);
    this.title = data['title'];
    this.titlex = data['title'];
    this.subtitle = data['subtitle'];
    this.description = data['description'];
    this.info = data['info'];
    this.brand = data['brand'];
    this.price= data['price'];
    this.imageupload = data['image'];
    this.oldimage = data['image'].split('imageserver/')[1];
    console.log(this.oldimage);
    this.imageerror=false;
    this.titleerror=false;
    this.descriptionerror=false;
    console.log(this.title);
  }

}
