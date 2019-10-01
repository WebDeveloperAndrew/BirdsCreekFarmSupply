import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-adminaddproduct',
  templateUrl: './adminaddproduct.component.html',
  styleUrls: ['./adminaddproduct.component.scss']
})
export class AdminaddproductComponent implements OnInit {

  imageupload = '/assets/img/placeholder.png';
  oldimage = '';
  uploading = false;
  uploaded = false;
  submitted=false;
  titleerror=false;
  brands = false;
  brandData = [];
  productinuse=false;
  imageerror=false;
  infoerror=false;
  subtitleerror=false;
  descriptionerror=false;
  selectedFile: File = null;
  imageDatabase="imageserver/upload";
  database;
  imageDatastore;

  constructor(private http: HttpClient){
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
  ngOnInit() {
    this.http.get('/assets/appConfig.json').subscribe(config => {
      this.database = config['database'];
      this.imageDatastore = config['imageDatastore'];
      this.collectData();
    });
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
        
      this.http.post(this.database+this.imageDatabase, fd)
          .subscribe(res => {
            console.group('Upload Information');
              console.log(res);
            console.groupEnd();
            this.uploading = false;
            this.uploaded = true;
            console.log(res['image']);
            this.imageupload = this.imageDatastore+ res['image'];
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
    if(content.value.title != "" && content.value.subtitle != "" && content.value.description != "" && this.uploaded == true && content.value.title && content.value.subtitle && content.value.description)
    {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
      event.preventDefault();
      console.log(content.value);
      const req = this.http.post(this.database + "createproduct", JSON.stringify({"title": content.value.title, "image": this.imageupload, "subtitle": content.value.subtitle, "description": content.value.description, "info": content.value.info, "price": content.value.price, "brand": content.value.brand}), httpOptions)
        .subscribe(
          res => {
            if(res['title'] == "MongoError")
            {
              console.group('Error Information');

              if(res['code'] == 11000)
              {
                console.log('Duplicate Product')
                this.productinuse=true;
              }
              console.error(res);
              console.groupEnd();
            }
            else
            {
              console.group('Upload Information');
              console.log(res);
              console.groupEnd();
              content.form.reset();
              this.imageupload = '/assets/img/placeholder.png';
              this.uploaded = false;
              this.oldimage = '';
              this.productinuse = false;
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
      if(this.uploaded == false)
      {
        this.imageerror=true;
      }
    }
  }
}
