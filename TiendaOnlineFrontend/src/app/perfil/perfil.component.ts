import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserServiceTsService } from 'src/app/services/user.service.ts.service';
import { Router, ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { NavbarComponent } from '../navbar/navbar.component';
import {Auth,signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail} from '@angular/fire/auth';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';



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
  userRol: string | undefined;
  resetPasswordString: boolean = false;
  stringToken: string | null = '';
  admin: boolean = false;
  addNew: boolean = false;
  userAddresses: any[] = [];
  isPopupVisible: boolean = false;

  constructor(private UserServiceTsService: UserServiceTsService,
    private router: Router, activerouter:ActivatedRoute,private auth: Auth, private navbar: NavbarComponent,public translate: TranslateService) {}

  onClick(){
    this.UserServiceTsService.logout()
    .then(response =>{ console.log(response);
      localStorage.clear();
      sessionStorage.clear();
      this.navbar.reloadPage();
      this.router.navigate(['']);
})
    .catch(error => console.log(error));

  }

  ngOnInit(): void {
    const token = localStorage.getItem('token'); 
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
        this.userRol = response.data.user_rol;
        if(this.userRol !== null){
          if(this.userRol === 'admin'){
            this.admin = true;          
          }
        }
      })
      .catch(error => {
        console.log(error);
        console.error('Error al obtener datos del backend:', error);
      });
        this.UserServiceTsService.checkLenguaje();


      axios.get('http://localhost:3000/user/addresses/', config)
      .then(response => {
        this.userAddresses = response.data.data;
      })
      .catch(error => {
        console.log(error);
        console.error('Error al obtener datos del backend:', error);
      });

  };
  

  async onClickResetPassword() {
    if (this.userEmail) { // Verifica si this.userEmail está definido
        const user_email = this.userEmail;

        try {
            await sendPasswordResetEmail(this.auth, user_email);
            this.resetPasswordString = true;
        } catch (error) {
            console.error(error);
            // Maneja el error aquí
        }
    } else {
        console.error('Email no definido'); // Maneja el caso cuando this.userEmail es undefined
    }

  }

  formData = {
    address_country: '',
    address_province: '',
    address_town: '',
    address_postal: '',
    street_and_number: '',
    additional_data: ''
  };

  onSubmitAddDirection() {
    const token = localStorage.getItem('token'); 
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    axios.post('http://localhost:3000/address', this.formData, config)
    .then(
      (response) => {
        // Manejar la respuesta del backend
        console.log('Dirección añadida con éxito:', response);
        this.userAddresses.push(this.formData);

        this.addNew = false
      },
      (error) => {
        
        console.error('Error en el registro:', error);
      }
    );

    this.isPopupVisible = false;

  }

  
  
  showPopup(): void {
      this.isPopupVisible = true;
  }
  
  hidePopup(): void {
      this.isPopupVisible = false;
  }  

  onDeleteAddress(address: any) {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
    // Realiza la llamada al backend para borrar la dirección
    axios.delete(`http://localhost:3000/address/${address._id}`, config)
      .then(
        (response) => {
          // Maneja la respuesta del backend
          console.log('Dirección eliminada:', response);
  
          // Remueve la dirección del array userAddresses
          const index = this.userAddresses.indexOf(address);
          if (index !== -1) {
            this.userAddresses.splice(index, 1);
          }
        },
        (error) => {
          console.error('Error al eliminar la dirección:', error);
        }
      );
  }
  
}
