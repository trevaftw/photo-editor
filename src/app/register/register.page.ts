import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router'
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { AlertController } from '@ionic/angular';

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
      console.log('reg result:', result)
      //eventually make this alert into a toast instead of an alerty
      this.showAlert("Success!", "Welcome aboard")
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
