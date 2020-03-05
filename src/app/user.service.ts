import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators'
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

    async isAuthenticated() {
        //if there is already a user, then yeah
        if (this.user) {
            return true
        }
        //if not, then go below

        //authState returns an obersvable, but we don't need that
        //so we convert it to a promise
        //we only need the first value from it so
        //pipe first
        const user = await this.afAuth.authState.pipe(first()).toPromise()

        //no we see if firebase has the user logged in, but the service does not, then we set the user to log them in to the service
        if (user) {

            this.setUser({
                username: user.email,
                uid: user.uid
            })
            return true
        }

        //if they aren't logged in firebase or in the service, return false 
        return false


    }

    getUID(): string {
        /*

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
        */

        //before isAuthenticated, we had the above code to do a hack check if a user is logged in firebase or in the service or not
        return this.user.uid

    }

    getUsername(): string{
        return this.user.username
    }
}