import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserServiceTsService } from 'src/app/services/user.service.ts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

errorMessage: string = '';
/*  constructor(
    private UserServiceTsService: UserServiceTsService,
    private router: Router
  )  {
    this.formAutenticacion = new FormGroup({
      user_email: new FormControl('', [Validators.required, Validators.email]),
      user_password: new FormControl('', Validators.required)
    })
  }*/
  formData = {
    user_email: '',
    user_password: ''
  };

  constructor(private UserServiceTsService: UserServiceTsService,
    private router: Router) {}
  

 async onSubmit() {
  try{
    const response = await this.UserServiceTsService.login(this.formData)
    const stringValue =  await response.user.getIdToken();
    sessionStorage.setItem('token',stringValue);
    this.router.navigate(['']);
  }catch(error){
    this.errorMessage = 'Ha ocurrido un error, por favor inténtalo de nuevo, puede que el correo electrónico o contraseña  sean incorrectos';
    console.log(error);
  }

}

}
