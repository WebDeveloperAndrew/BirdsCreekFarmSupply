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
  submitted=false;
  nameerror=false;
  brandinuse=false;
  imageerror=false;
  websiteerror=false;
  descriptionerror=false;
  selectedFile: File = null;
  imageDatabase="http://localhost:4000/api/imageserver/upload";
  database="http://localhost:4000/api/"

  constructor(private http: HttpClient){
  }

  ngOnInit() {
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
    this.nameerror=false;
    this.imageerror=false;
    this.submitted=false;
    this.websiteerror=false;
    this.descriptionerror=false;
    if(content.value.name != "" && content.value.link != "" && content.value.description != "" && this.uploaded == true && content.value.name && content.value.link && content.value.description)
    {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
      event.preventDefault();
      const req = this.http.post(this.database + "createbrand", JSON.stringify({"name": content.value.name, "image": this.imageupload, "link": content.value.link, "description": content.value.description, "info": content.value.info}), httpOptions)
        .subscribe(
          res => {
            if(res['name'] == "MongoError")
            {
              console.group('Error Information');

              if(res['code'] == 11000)
              {
                console.log('Duplicate Brand')
                this.brandinuse=true;
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
              this.brandinuse = false;
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
      if(content.value.name == "" || content.value.name == null)
      {
        this.nameerror=true;
      }
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
}
