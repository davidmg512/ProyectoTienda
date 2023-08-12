import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-editarperfil',
  templateUrl: './editarperfil.component.html',
  styleUrls: ['./editarperfil.component.css']
})

export class EditarperfilComponent {

  formData = {
    user_nombre: '',
    user_apellidos: '',
    user_telf: ''
  };

  constructor(private http: HttpClient) {}

  onSubmit(){
    const userId = 
    this.http.put('http://localhost:3000/user/:user_id/', this.formData)
    .subscribe(
      (response) => {
        console.log("Actualización exitosa: ", response);
      },
      (error) => {
        console.log("Error en la actualización del perfil: ", error);
      });
  }
}
