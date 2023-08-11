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
    const token = sessionStorage.getItem('token'); // Reemplaza con tu token real
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
  
    axios.get('http://localhost:3000/user/perfil', config)
      .then(response => {
        console.log(response.data.user_email);
        this.userNombre = response.data.user_nombre;
      })
      .catch(error => {
        console.error('Error al obtener datos del backend:', error);
      });
  }


}
