import { Injectable } from '@angular/core';
import {Auth,signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail} from '@angular/fire/auth';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceTsService {

  constructor(private auth: Auth,public translate: TranslateService) { }

  login({user_email, user_password}: any) {
    return signInWithEmailAndPassword(this.auth, user_email, user_password);
  }


  logout(){
    return signOut(this.auth);
  }

  isLoggedIn(): boolean {
    console.log(this.auth.currentUser);
    //return this.auth.currentUser !== null;
    return (sessionStorage.getItem('token') !== null);
  }

  restorePassword({user_email}: any){
    return sendPasswordResetEmail(this.auth,user_email)
  }

  loginWithGoogle(){
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  checkLenguaje(){
    const lenguaje = localStorage.getItem('lenguaje'); 
    if(lenguaje != null){
      this.translate.use(lenguaje);
    }
  }

}
