import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userPosts;

  constructor(
    private user: UserService,
    private afStore: AngularFirestore
  ) {
    const posts = afStore.doc(`users/${user.getUID()}`)

    //valueChanges is an observable from angularfirestore that returns a stream
    this.userPosts = posts.valueChanges()
  }

  ngOnInit() {
  }

  getImgSrc(string){
    return `https://ucarecdn.com/${string}/`
  }

}
