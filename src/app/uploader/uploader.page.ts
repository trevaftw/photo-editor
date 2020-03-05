import { Component, OnInit, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import uploadcareApi from './uploadcare';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.page.html',
  styleUrls: ['./uploader.page.scss'],
})
export class UploaderPage implements OnInit {

  constructor(public http: HttpClient) { }

  uploadedImage: string;

  ngOnInit() {
  }

  fileChanged(event) {
    const files = event.target.files;
    if(files[0] === null){
      return
    }

    //uploadcare requires information when uploading: your key, whether to store it, and the file, 
    //https://uploadcare.com/docs/api_reference/upload/request_based/
    const data = new FormData();
    data.append('UPLOADCARE_PUB_KEY', uploadcareApi);
    data.append('UPLOADCARE_STORE', '1');
    data.append('file', files[0]); 


    this.http.post('https://upload.uploadcare.com/base/', data)
      .subscribe(event => {
        console.log('subscribe event', event.file)
         this.uploadedImage = `https://ucarecdn.com/${event.file}/`;
      })
  }

}
