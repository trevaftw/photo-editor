import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {

  postId: string; 
  post; 

  constructor(
    private route: ActivatedRoute,
    private afStore: AngularFirestore, 
    private user: UserService, 
  ) { 
    //to get post id from url
  }

  ngOnInit() {
    this.postId = this.route.snapshot.paramMap.get('id');
    this.post = this.afStore.doc(`posts/${this.postId}`).valueChanges();
  }

  getImgSrc(string){
    return `https://ucarecdn.com/${string}/`
  }
  
}
