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
  

  onSubmit() {
    this.UserServiceTsService.login(this.formData)
      .then(response =>{ console.log(response);
        console.log(response.user.email);
        const nullableValue: string | null = response.user.email; // Supongamos que obtienes un valor nullable de alguna función
        const stringValue: string = nullableValue ?? 'Valor Predeterminado';
        sessionStorage.setItem('email',stringValue);
        this.router.navigate(['']);
  })
      .catch(error => console.log(error))
  }

}
