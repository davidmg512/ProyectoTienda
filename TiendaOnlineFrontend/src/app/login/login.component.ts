import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserServiceTsService } from 'src/app/services/user.service.ts.service';
import { Router } from '@angular/router';
import axios from 'axios';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

errorMessage: string = '';

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
    private router: Router,public translate: TranslateService) {}
  
config = {};

 async onSubmit() {
  try{
    const response = await this.UserServiceTsService.login(this.formData)
    const stringValue =  await response.user.getIdToken();
    localStorage.setItem('token',stringValue);
    this.router.navigate(['']);
  }catch(error){
    this.errorMessage = 'Ha ocurrido un error, por favor inténtalo de nuevo, puede que el correo electrónico o contraseña  sean incorrectos';
    console.log(error);
  }
}

async onGoogleClick() {
  try{
    const response = await this.UserServiceTsService.loginWithGoogle();
    const stringValue = await response.user.getIdToken();
    await localStorage.setItem('token',stringValue);
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
    this.errorMessage = 'Ha ocurrido un error';
    console.log(this.errorMessage,error);
  }
  
  
}

  async resetPassword() {
    
    this.router.navigate(['/resetpassword']);

  }

 /* ngOnInit(): void {
    const lenguaje = localStorage.getItem('lenguaje'); 
    if(lenguaje != null){
      this.translate.use(lenguaje);
    }
    
  }*/
}
