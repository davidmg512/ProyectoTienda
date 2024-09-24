import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { UserServiceTsService } from '../services/user.service.ts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  formData = {
    user_nombre: '',
    user_email: '',
    user_password: '',
    user_apellidos: '',
    user_telf: ''
  };

  errorMessage: boolean = false;

  constructor(private UserServiceTsService: UserServiceTsService,public translate: TranslateService,private router: Router) {}

  onSubmit() {
    // Enviar los datos del formulario al backend

    this.UserServiceTsService.register(this.formData).subscribe(
      (response) => {
        console.log('Registro exitoso.');
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log('Error en el registro.');
        this.errorMessage = true;
      }
    )
  }

  ngOnInit(): void {
    this.UserServiceTsService.checkLenguaje();
    }
}
