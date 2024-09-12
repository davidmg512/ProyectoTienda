import { Injectable } from '@angular/core';
import {Auth,signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail} from '@angular/fire/auth';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserServiceTsService {

  config = {};
  //url:string = 'https://sushopnode.onrender.com';
  //url:string = "http://localhost:3000";
  private url = environment.apiUrl;


  constructor(private auth: Auth,public translate: TranslateService, private http: HttpClient) { }

  login({user_email, user_password}: any) {
    return signInWithEmailAndPassword(this.auth, user_email, user_password);
  }


  logout(){
    return signOut(this.auth);
  }

  isLoggedIn(): boolean {
    //return this.auth.currentUser !== null;
    return ((sessionStorage.getItem('token') !== null));
  }

  restorePassword({user_email}: any){
    return sendPasswordResetEmail(this.auth,user_email)
  }

  loginWithGoogle(){
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  postEmptyGoogleData(data: any): Observable<any> {
    const token = localStorage.getItem('token'); 

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<any>(`${this.url}/loginGoogle`, data, { headers });
  }

  checkLenguaje(){
    const lenguaje = localStorage.getItem('lenguaje'); 
    if(lenguaje != null){
      this.translate.use(lenguaje);
    }
  }

}
