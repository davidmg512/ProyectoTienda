import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserServiceTsService } from 'src/app/services/user.service.ts.service';
import { Router, ActivatedRoute } from '@angular/router';
import axios from 'axios';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit{

  userEmail: string | undefined;
  userNombre: string | undefined;
  userApellido: string | undefined;
  userTelefono: string | undefined;

  constructor(private UserServiceTsService: UserServiceTsService,
    private router: Router, activerouter:ActivatedRoute) {}

  onClick(){
    this.UserServiceTsService.logout()
    .then(response =>{ console.log(response);
      sessionStorage.clear();
      this.router.navigate(['']);
})
    .catch(error => console.log(error));

  }

  ngOnInit(): void {
    const token = sessionStorage.getItem('token'); 
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
  
    axios.get('http://localhost:3000/user/perfil', config)
      .then(response => {
        this.userNombre = response.data.user_nombre;
        this.userEmail = response.data.user_email;
        this.userApellido = response.data.user_apellidos;
        this.userTelefono = response.data.user_telf;
      })
      .catch(error => {
        console.error('Error al obtener datos del backend:', error);
      });
  }


}
