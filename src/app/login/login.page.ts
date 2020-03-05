import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import {UserService} from '../user.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  //initialize the variables
  username: string = "";
  password: string = "";

  constructor(
    public afAuth: AngularFireAuth, 
    public alert: AlertController,
    public user: UserService,
    public router: Router) { }

  ngOnInit() {

  }

  async login() {
    const { username, password } = this;
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(username, password);

      if(result.user) {
        //if true, it means the user logged in
        
        //so we want to set them into the userservice by injection in th econstructor. we also need to put it as a provider in our app.module
        this.user.setUser({
          //username is passed in through login function, and uid comes from the result of login
          username,
          uid: result.user.uid
        })

        this.showAlert("Success!", "Redirecting you to your feed.")
        //after login, go to the tabs (which auto shows the feed)
        this.router.navigate(['/tabs']);
      }
    } catch (error) {
      console.log('Error with login:', error)
      if(error.code === "auth/user-not-found"){
        alert("User not found")
      }
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
