import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { UserServiceTsService } from '../services/user.service.ts.service';

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

  constructor(private UserServiceTsService: UserServiceTsService,private http: HttpClient,public translate: TranslateService) {}

  onSubmit() {
    // Enviar los datos del formulario al backend
    
    this.http.post('http://localhost:3000/register', this.formData)
      .subscribe(
        (response) => {
          // Manejar la respuesta del backend
          console.log('Registro exitoso:', response);
        },
        (error) => {
          // Manejar errores si ocurre alguno
          console.error('Error en el registro:', error);
        }
      );
      
  }

  ngOnInit(): void {
    this.UserServiceTsService.checkLenguaje();
    }
}
