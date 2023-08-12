import { Injectable } from '@angular/core';
import {Auth,signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserServiceTsService {

  constructor(private auth: Auth) { }

  login({user_email, user_password}: any) {
    return signInWithEmailAndPassword(this.auth, user_email, user_password);
  }


  logout(){
    return signOut(this.auth);
  }

  isLoggedIn(): boolean {
    return this.auth.currentUser !== null;
  }

  restorePassword({user_email}: any){
    return sendPasswordResetEmail(this.auth,user_email)
  }


}
