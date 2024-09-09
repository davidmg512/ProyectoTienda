
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


    async uploadImagesToCloudflare(images:  File[]) {
      const cloudflareApiToken = '316430a42c83770acd2388043d75ca80b8169';
      const cloudflareApiUrl = 'https://api.cloudflare.com/client/v4/accounts/7487b224e6bdb241146084a2bd8da49d/images/v1';
      const config = {
        headers: {
          'Authorization': `Bearer ${cloudflareApiToken}`,
          'Content-Type': 'multipart/form-data'
        }
      };
    
      const uploadPromises = images.map(async image => {
        const formData = new FormData();
        formData.append('file', image);
        try {
          const response = await axios.post(cloudflareApiUrl, formData, config);
          return response.data.result.url;
        } catch (error) {
          console.error(`Error al subir la imagen "${image.name}" a Cloudflare:`, error);
          return null;
        }
      });
    
      return Promise.all(uploadPromises);
    }
    
    async onCreateProduct() {

    
      const imagesArray = Array.from(this.selectedImages);

      if (!Array.isArray(imagesArray) || this.selectedImages.length === 0) {
        return;
      }
    
      const uploadedImageUrls = await this.uploadImagesToCloudflare(imagesArray);
    
      const formData = new FormData();
      const { producto_nombre, producto_descripcion, producto_precio, producto_categoria } = this.productForm.value;
    
      formData.append('producto_nombre', producto_nombre);
      formData.append('producto_descripcion', producto_descripcion);
      formData.append('producto_precio', producto_precio);
      formData.append('producto_categoria', producto_categoria);
    
      for (const imageUrl of uploadedImageUrls) {
        if (imageUrl) {
          formData.append('producto_imagenes', imageUrl);
        }
      }
    
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        };
    
        const response = await axios.post('http://localhost:3000/addProduct/', formData, config);
        console.log('Respuesta del servidor:', response.data);
      } catch (error) {
        console.error('Error al enviar la solicitud:', error);
      }
    }
    

    /*async onCreateProduct() {
      if (this.selectedImages.length === 0) {
        return;
      }
    
      const formData = new FormData();
      const { producto_nombre, producto_descripcion, producto_precio, producto_categoria } = this.productForm.value;
    
      formData.append('producto_nombre', producto_nombre);
      formData.append('producto_descripcion', producto_descripcion);
      formData.append('producto_precio', producto_precio);
      formData.append('producto_categoria', producto_categoria);
    
      for (const image of this.selectedImages) {
        formData.append('producto_imagenes', image);
      }

      
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data' // No es necesario agregar los headers de FormData aquí
          }
        };
    
        const response = await axios.post('http://localhost:3000/addProduct/', formData, config);
        console.log('Respuesta del servidor:', response.data);
      } catch (error) {
        console.error('Error al enviar la solicitud:', error);
      }
    }*/
}

