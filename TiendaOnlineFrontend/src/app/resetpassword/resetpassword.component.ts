import { Component } from '@angular/core';
import {Auth,signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserServiceTsService } from '../services/user.service.ts.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent {

  constructor(private UserServiceTsService: UserServiceTsService,private auth: Auth,public translate: TranslateService) {}

  formData = {
    user_email: ''
  };
  resetPasswordString: string = '';

  async onClick() {
    if (this.formData.user_email) { // Verifica si this.userEmail está definido
        const user_email = this.formData.user_email;
  
        try {
            await sendPasswordResetEmail(this.auth, user_email);
            this.resetPasswordString = 'Se ha enviado un correo electrónico de reseteo de contraseña a su correo personal';
        } catch (error) {
            console.error(error);
            // Maneja el error aquí
        }
    } else {
        console.error('Email no definido'); // Maneja el caso cuando this.userEmail es undefined
    }
  }

  ngOnInit(): void {
    this.UserServiceTsService.checkLenguaje();
    }
  
}
