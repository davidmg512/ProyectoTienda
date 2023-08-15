import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';
import { config } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { UserServiceTsService } from 'src/app/services/user.service.ts.service';

@Component({
  selector: 'app-editarperfil',
  templateUrl: './editarperfil.component.html',
  styleUrls: ['./editarperfil.component.css']
})

export class EditarperfilComponent {

  userNombre: string = '';
  userApellido: string = '';
  userTelefono: string = '';

  

  formData = {
    user_nombre: '',
    user_apellidos: '',
    user_telf: ''
  };

  constructor(private UserServiceTsService: UserServiceTsService,private http: HttpClient,public translate: TranslateService) {}

  config = {};

  ngOnInit(): void {
    const token = localStorage.getItem('token'); 
    
    this.config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    axios.get('http://localhost:3000/user/perfil', this.config)
      .then(response => {
        this.userNombre = response.data.user_nombre;
        this.userApellido = response.data.user_apellidos;
        this.userTelefono = response.data.user_telf;
        this.formData.user_nombre = this.userNombre;
        this.formData.user_apellidos = this.userApellido;
        this.formData.user_telf = this.userTelefono;
      })
      .catch(error => {
        console.error('Error al obtener datos del backend:', error);
      });
        const lenguaje = localStorage.getItem('lenguaje'); 
        if(lenguaje != null){
          this.translate.use(lenguaje);
        }

  }

  onSubmit(){
    axios.put('http://localhost:3000/updateUser', this.formData, this.config)
    .then(
      (response) => {
        console.log("Actualización exitosa: ", response);
      },
      (error) => {
        console.log("Error en la actualización del perfil: ", error);
      });
  }

  isValidForm(): boolean {
    return (
      this.formData.user_nombre !== '' &&
      this.formData.user_apellidos !== '' &&
      this.formData.user_telf !== ''
    );
  }
}
