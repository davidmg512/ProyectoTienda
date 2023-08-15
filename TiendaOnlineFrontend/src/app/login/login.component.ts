import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserServiceTsService } from 'src/app/services/user.service.ts.service';
import { Router } from '@angular/router';
import axios from 'axios';
import { TranslateService } from '@ngx-translate/core';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

errorMessage: boolean = false;

  formData = {
    user_email: '',
    user_password: ''
  };

  datosVaciosParaGoogle = {
    user_nombre: '',
    user_apellidos: '',
    user_telf: ''
  };

  constructor(private UserServiceTsService: UserServiceTsService,
    private router: Router,public translate: TranslateService, private navbar: NavbarComponent) {}
  
config = {};

 async onSubmit() {
  try{
    const response = await this.UserServiceTsService.login(this.formData)
    const stringValue =  await response.user.getIdToken();
    localStorage.setItem('token',stringValue);
    sessionStorage.setItem('token',stringValue);
    this.navbar.reloadPage();
    this.router.navigate(['']);
    
  }catch(error){
    this.errorMessage = true;
    console.log(error);
  }
}

async onGoogleClick() {
  try{
    const response = await this.UserServiceTsService.loginWithGoogle();
    const stringValue = await response.user.getIdToken();
    await localStorage.setItem('token',stringValue);
    sessionStorage.setItem('token',stringValue);
    this.navbar.reloadPage();
    this.router.navigate(['']);

    const token = localStorage.getItem('token'); 
    this.config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    axios.get('http://localhost:3000/user/perfil', this.config)
    .then(response => {

    })
    .catch(error => {
      axios.post('http://localhost:3000/loginGoogle', this.datosVaciosParaGoogle, this.config)
      .then(
        (response) => {
          console.log("Se han almacenado los datos vacíos  en la base de  datos: ", response);
        },
        (error) => {
          console.log("Algo ha salido terriblemente mal: ", error);
        });
    });
    

  }catch(error){
    this.errorMessage = true;
    console.log(this.errorMessage,error);
  }
  
  
}

  async resetPassword() {
    
    this.router.navigate(['/resetpassword']);

  }

  ngOnInit(): void {
    this.UserServiceTsService.checkLenguaje();
    }
}
