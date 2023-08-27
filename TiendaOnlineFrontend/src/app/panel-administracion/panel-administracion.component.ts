
import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserServiceTsService } from 'src/app/services/user.service.ts.service';
import { Router, ActivatedRoute } from '@angular/router';
import axios from 'axios';
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

  constructor(private UserServiceTsService: UserServiceTsService,
    private router: Router, activerouter:ActivatedRoute,private auth: Auth, private navbar: NavbarComponent,public translate: TranslateService,private formBuilder: FormBuilder) {


      this.productForm = this.formBuilder.group({
        producto_nombre: ['', Validators.required],
        producto_description: [''],
        producto_precio: ['', Validators.required],
        producto_categoria: ['',Validators.required],
        producto_imagenes:[null]
      });

    }

    onFileSelected(event: any){
      this.selectedImages = event.target.files;
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

    async onCreateProduct(){
      if(this.productForm.valid) {
        const formData = new FormData();
        formData.append('producto_nombre',this.productForm.value.producto_nombre);
        formData.append('producto_descripcion',this.productForm.value.producto_descripcion);
        formData.append('producto_precio',this.productForm.value.producto_precio);
        formData.append('producto_categoria',this.productForm.value.producto_categoria);
        

        for(let i = 0; i < this.selectedImages.length; i++){
          formData.append('producto_imagenes',this.selectedImages[i]);
        }

        const token = localStorage.getItem('token'); 
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };

        axios.post(`http://localhost:3000/addProduct/`,formData ,config)
        .then(
          (response) => {
            console.log('El nuevo producto se ha añdido con éxito:', response);
            window.location.reload();
          },
          (error) => {
            console.error('Ha habido un fallo al añadir el producto:', error);
          }
        );


      }
    }
}
