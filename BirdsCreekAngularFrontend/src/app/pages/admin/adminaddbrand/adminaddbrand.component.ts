import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-adminaddbrand',
  templateUrl: './adminaddbrand.component.html',
  styleUrls: ['./adminaddbrand.component.scss']
})
export class AdminaddbrandComponent implements OnInit {

  imageupload = '/assets/img/placeholder.png';
  oldimage = '';
  uploading = false;
  uploaded = false;
  nameerror=false;
  imageerror=false;
  websiteerror=false;
  descriptionerror=false;
  selectedFile: File = null;
  imageDatabase="http://localhost:4000/api/imageserver/upload";
  server="http://localhost:4000/api/createbrand"

  constructor(private http: HttpClient){
  }

  ngOnInit() {
  }

  imageUpload(event)
  {
    console.log(event.target.files[0]);
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
            console.log(res);
            this.uploading = false;
            this.uploaded = true;
            this.imageupload = 'http://localhost:4000'+ res['image'];
            this.imageerror=false;
            this.oldimage = res['filename'];
          });
    }
  }
  public onSubmit(content) {
    this.nameerror=false;
    this.imageerror=false;
    this.websiteerror=false;
    this.descriptionerror=false;
    console.log(content.value.name);
    if(content.value.name != "" && content.value.link != "" && content.value.description != "" && this.uploaded == true && content.value.name && content.value.link && content.value.description)
    {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
      event.preventDefault();
      console.log(content.value);
      const req = this.http.post(this.server, JSON.stringify({"name": content.value.name, "image": this.imageupload, "link": content.value.link, "description": content.value.description, "info": content.value.info}), httpOptions)
        .subscribe(
          res => {
            console.log(res);
            content.form.reset();
            this.imageupload = '/assets/img/placeholder.png';
            this.uploaded = false;
          },
          err => {
            console.log("Error occured");
            
          }
        );
    }
    else
    {
      if(content.value.name == "" || content.value.name != true)
      {
        this.nameerror=true;
      }
      if(content.value.link == "" || content.value.link != true)
      {
        this.websiteerror=true;
      }
      if(content.value.description == "" || content.value.description != true)
      {
        this.descriptionerror=true;
      }
      if(this.uploaded == false)
      {
        this.imageerror=true;
      }
    }
  }
}
