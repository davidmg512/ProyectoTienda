
import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserServiceTsService } from 'src/app/services/user.service.ts.service';
import { Router, ActivatedRoute } from '@angular/router';
import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
import { NavbarComponent } from '../navbar/navbar.component';
import {Auth,signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail} from '@angular/fire/auth';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-panel-administracion',
  templateUrl: './panel-administracion.component.html',
  styleUrls: ['./panel-administracion.component.css']
})
export class PanelAdministracionComponent {


  listOfUsers: any[] = [];
  searchQuery: string = '';
  infoRelleno: string = ';'
  productForm: FormGroup;
  selectedImages: File[] = [];
  selectedImage: File | null = null;


  constructor(private UserServiceTsService: UserServiceTsService,
    private router: Router, activerouter:ActivatedRoute,private auth: Auth, private navbar: NavbarComponent,public translate: TranslateService,private formBuilder: FormBuilder) {

      this.productForm = new FormGroup({
        producto_nombre: new FormControl('', Validators.required),
        producto_descripcion: new FormControl(''), // Corregido el nombre del control
        producto_precio: new FormControl('', Validators.required),
        producto_categoria: new FormControl('', Validators.required), // Corregido el nombre del control
        producto_imagenes: new FormControl(null),
      });
      

    }



    
    ngOnInit(): void {
      const token = localStorage.getItem('token'); 
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
    
          this.UserServiceTsService.checkLenguaje();
  
  
        axios.get('http://localhost:3000/user/all/', config)
        .then(response => {
          this.listOfUsers = response.data.data;
        })
        .catch(error => {
          console.log(error);
          console.error('Error al obtener datos del backend:', error);
        });
  
    };

    onDeleteUser(users: any){
      const token = localStorage.getItem('token'); 
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
  
        axios.delete(`http://localhost:3000/user/delete/${users.user_id}`, config)
        .then(
          (response) => {
            console.log('Usuario eliminado correctamente:', response);
            axios.delete(`http://localhost:3000/deleteAllAddressofUser/${users.user_id}`,config)
            .then(
              (response) => {
                console.log('Direcciónes eliminadas:', response);
                window.location.reload();
              },
              (error) => {
                console.error('Error al eliminar las direcciónes:', error);
              }
            );
    
          },
          (error) => {
            console.error('Error al eliminar el usuario:', error);
          }
        );
    }

    filterUsers(): any[] {
      if (!this.searchQuery) {
        return this.listOfUsers;
      }
      
      const query = this.searchQuery.toLowerCase();
      return this.listOfUsers.filter((users) => {
        return (
          users.user_email.toLowerCase().includes(query) ||
          users.user_nombre.toLowerCase().includes(query) ||
          users.user_apellidos.toLowerCase().includes(query) ||
          users.user_telf.toLowerCase().includes(query) ||
          users.user_rol.toLowerCase().includes(query)
        ); 
      });

    };

    onChangeAdmin(users: any) {
      const token = localStorage.getItem('token'); 
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
  
        axios.put(`http://localhost:3000/updateAdmin/${users.user_id}`,this.infoRelleno, config)
        .then(
          (response) => {
            console.log('El rol del usuario ha cambiado con éxito:', response);
            window.location.reload();
          },
          (error) => {
            console.error('Error al cambiar el rol del usuario:', error);
          }
        );

    }

    onFileSelected(event: any){
      this.selectedImages = event.target.files;
    }





      async onCreateProduct() {
          if (this.selectedImages.length === 0) {
            return;
          }
      
          const productData = {
            producto_nombre: 'Nombre del producto',
            producto_descripcion: 'Descripción del producto',
            producto_precio: 100,
            producto_categoria: 'Categoría del producto',
          };
      
          const formData = new FormData();
      
          for (const image of this.selectedImages) {
            formData.append('producto_imagenes', image);
          }
      
          formData.append('producto_nombre', productData.producto_nombre);
          formData.append('producto_descripcion', productData.producto_descripcion);
          formData.append('producto_precio', productData.producto_precio.toString());
          formData.append('producto_categoria', productData.producto_categoria);
      
          try {
            const token = localStorage.getItem('token'); 
            const response = await axios.post('http://localhost:3000/addProduct/', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
              },
            });
      
            console.log('Respuesta del servidor:', response.data);
          } catch (error) {
            console.error('Error al enviar la solicitud:', error);
          }
      }
}

