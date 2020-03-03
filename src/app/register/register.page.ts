import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

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

constructor(public afAuth: AngularFireAuth) { }

ngOnInit() {
}

async register() {
  const { username, password, confirmPassword } = this;
  if(password !== confirmPassword){
    alert("Passwords do not match.")
  }
  try {
    const result = await this.afAuth.auth.createUserWithEmailAndPassword(username, password);
    console.log('reg result:', result)
  } catch (error) {
    console.log('Error with registration:', error)
  }
}

}
