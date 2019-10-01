import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admineditbrand',
  templateUrl: './admineditbrand.component.html',
  styleUrls: ['./admineditbrand.component.scss']
})
export class AdmineditbrandComponent implements OnInit {

  imageupload = '/assets/img/placeholder.png';
  oldimage = '';
  uploading = false;
  uploaded = true;
  uploadedmessage = false;
  loaded = false;

  imageerror=false;
  websiteerror=false;
  descriptionerror=false;
  loadingerr=false;
  selectedFile: File = null;
  submitted = false;
  name="";
  namex="";
  description="";
  info="";
  link="";
  imageDatabase="imageserver/upload";
  database;
  imageDatastore;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}
  ngOnInit() {
    this.http.get('/assets/appConfig.json').subscribe(config => {
      this.database = config['database'];
      this.imageDatastore = config['imageDatastore'];
      this.AppConfiguration();
    });

  }
  
  AppConfiguration(){
    this.route.params.subscribe(params => {
      console.log(params['brandname']);
      this.findBrand(params['brandname']);
    });
  }

  deleteBrand()
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    this.http.post(this.database+"deletebrand", JSON.stringify({"name":this.namex}), httpOptions)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/admin/brands']);
        },
        err => {
          console.log("Error occured");
          this.loadingerr = true;
          console.log(err);
        }
      );
  }

  findBrand(brandname)
  {
    console.log("brand");
    console.log(brandname);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    console.log(JSON.stringify({"name":brandname}));
    this.http.post(this.database+"getbrand", JSON.stringify({"name":brandname}), httpOptions)
      .subscribe(
        res => {
          console.log(res);
          this.setBrandFields(res);
          this.loaded = true;
        },
        err => {
          console.log("Error occured");
          this.loadingerr = true;
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
        
      this.http.post(this.database+this.imageDatabase, fd)
          .subscribe(res => {
            console.group('Upload Information');
              console.log(res);
            console.groupEnd();
            this.uploading = false;
            this.uploaded = true;
            this.uploadedmessage = true;
            this.submitted = false;
            console.log(res['image']);
            this.imageupload = this.imageDatastore + res['image'];
            this.imageerror=false;
            this.oldimage = res['filename'];
          });
    }
  }

  public onSubmit(content) {

    this.imageerror=false;
    this.websiteerror=false;
    this.descriptionerror=false;
    this.uploadedmessage = false;
    this.submitted = false;
    console.log(this.namex);
    if(content.value.link != "" && content.value.description != "" && this.uploaded == true && content.value.link && content.value.description)
    {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
      event.preventDefault();
      console.log(content.value);
      const req = this.http.post(this.database + 'updatebrand', JSON.stringify({"name": this.namex, "image": this.imageupload, "link": content.value.link, "description": content.value.description, "info": content.value.info}), httpOptions)
        .subscribe(
          res => {
            console.log(res);
            this.submitted = true;
          },
          err => {
            console.log("Error occured");
            console.log(err);
          }
        );
    }
    else
    {
      if(content.value.link == "" || content.value.link == null)
      {
        this.websiteerror=true;
      }
      if(content.value.description == "" || content.value.description == null)
      {
        this.descriptionerror=true;
      }
      if(this.uploaded == false)
      {
        this.imageerror=true;
      }
    }
  }
  public setBrandFields(data)
  {
    this.name = data['name'];
    this.namex = data['name'];
    this.link = data['link'];
    this.description = data['description'];
    this.info = data['info'];
    this.imageupload = data['image'];
    this.oldimage = data['image'].split('imageserver/')[1];
    console.log(this.oldimage);
    this.imageerror=false;
    this.websiteerror=false;
    this.descriptionerror=false;
  }
}
