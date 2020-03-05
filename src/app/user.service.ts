import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth';

interface user {
    username: string;
    uid: string;
}

@Injectable()
export class UserService {
    private user: user;

    constructor(private afAuth: AngularFireAuth) {

    }

    setUser(user: user) {
        this.user = user;
    }

    getUID() {

        if (!this.user) {
            //^^^ if the service doesn't know A user is logged in, but...
            if (this.afAuth.auth.currentUser) {
                //^^^firebase does know a user is logged in
                const user = this.afAuth.auth.currentUser;
                //we then set a user using the info from firebase
                this.setUser({
                    username: user.email,
                    uid: user.uid
                })
                return user.uid;

            } else {
                throw new Error("User not logged in")
            }

        } else {
            return this.user.uid
        }
    }
}