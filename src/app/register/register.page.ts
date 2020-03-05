import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router'
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { AngularFirestore } from '@angular/fire/firestore'

import { AlertController } from '@ionic/angular';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  //initialize the variables
  username: string = "";
  password: string = "";
  confirmPassword: string = "";

  constructor(
    public afAuth: AngularFireAuth,
    public alert: AlertController,
    public router: Router,
    public user: UserService,
    public afStore: AngularFirestore,
  ) { }

  ngOnInit() {
  }

  async register() {
    const { username, password, confirmPassword } = this;

    if (password !== confirmPassword) {
      this.showAlert("Error", "Passwords do not match")
    }

    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(username, password);

      //inside of the users collection in the fire store we create a new user
      // with their uid from the authentication, and username from gistration
      this.afStore.doc(`users/${result.user.uid}`).set({username})

      //this sets the user for the service being used throughout the code / site
      this.user.setUser({
        username,
        uid: result.user.uid
      })

      //eventually make this alert into a toast instead of an alerty
      this.showAlert("Success!", "Welcome aboard. Now redirecting you to your feed.")
      this.router.navigate(['/tabs'])
    } catch (error) {
      this.showAlert('Error with registration:', error)
    }

  }


  async showAlert(header: string, message: string) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: ["Ok"]
    })
    await alert.present()
  }

}
