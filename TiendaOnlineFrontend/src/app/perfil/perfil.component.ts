import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserServiceTsService } from 'src/app/services/user.service.ts.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import {Auth, sendPasswordResetEmail} from '@angular/fire/auth';
import { TranslateService } from '@ngx-translate/core';
import { PerfilService } from '../services/perfil.service';
import { AddressService } from '../services/address.service';
import { ChangeDetectorRef } from '@angular/core';




@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  encapsulation: ViewEncapsulation.None
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
  panelOpenState = false;
  addressDataToUpdate: any = {};

  addressForm: FormGroup;
  selectedAddress: any = null;

  constructor(
    private UserServiceTsService: UserServiceTsService,
    private router: Router, 
    activerouter:ActivatedRoute,
    private auth: Auth, 
    private navbar: NavbarComponent,
    public translate: TranslateService,
    private perfilService: PerfilService,
    private addressService: AddressService,
    private cdr: ChangeDetectorRef
  ) {

      this.addressForm = new FormGroup({
        country: new FormControl('', Validators.required),
        province: new FormControl('', Validators.required),
        town: new FormControl('', Validators.required),
        postal: new FormControl('',Validators.required),
        street: new FormControl('', Validators.required),
        additionalInfo: new FormControl('')
      });
  
    }

    fillAddressForm(address: any) {
      this.selectedAddress = address;
      this.addressForm.patchValue({
        country: address.address_country,
        province: address.address_province,
        town: address.address_town,
        postal: address.address_postal,
        street: address.street_and_number,
        additionalInfo: address.additional_data
      });
    }
    


  onClick(){
    this.UserServiceTsService.logout()
    .then(response =>{ console.log(response);
      localStorage.clear();
      sessionStorage.clear();
      this.navbar.reloadPage();
      this.router.navigate(['']);

    }).catch(error => console.log(error));

  }

  ngOnInit(): void {
    const token = localStorage.getItem('token'); 
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    this.perfilService.getPerfil().subscribe(
      data => {
        this.userNombre = data.user_nombre;
        this.userEmail = data.user_email;
        this.userApellido = data.user_apellidos;
        this.userTelefono = data.user_telf;
        this.userRol = data.user_rol;
        if(this.userRol !== null){
          if(this.userRol === 'admin'){
            this.admin = true;          
          }
        }
      },
      error => {
        console.log(error);
        console.error('Error al obtener datos del backend:', error);
      }
    )
    
    this.UserServiceTsService.checkLenguaje();

    this.addressService.getAddresses().subscribe(
      data => {
        this.userAddresses = data.data;
      },
      error => {
        console.log(error);
        console.error('Error al obtener datos del backend:', error);
      }
    )
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

    this.addressService.addAdress(this.formData).subscribe(
      data =>{
        console.log('Dirección añadida con éxito:', data);
        this.userAddresses.push(data);

        this.addNew = false
        //window.location.reload();
      },
      error =>{
        console.error('Error al añadir la dirección:', error);
      }
    )

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

    this.addressService.deleteAddress(address._id).subscribe(
      data => {
        // Maneja la respuesta del backend
        console.log('Dirección eliminada:', data);

        // Remueve la dirección del array userAddresses
        const index = this.userAddresses.findIndex(addr => addr._id === address._id);
        console.log(index); // Verificar el índice

        if (index !== -1) {
          console.log("Eliminando dirección...");
          this.userAddresses.splice(index, 1);

          // Forzar la detección de cambios si es necesario
          this.cdr.detectChanges();
        }
      },
      error => {
        console.error('Error al eliminar la dirección:', error);
      }
    );
  }

  async onUpdateAddress(address: any){
    const token = localStorage.getItem('token');
    const formData = this.addressForm.value;
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
    const adressDataToUpdate = {

      address_country: formData.country,
      address_province: formData.province,
      address_town: formData.town,
      address_postal: formData.postal,
      street_and_number: formData.street,
      additional_data: formData.additionalInfo
    
    }

    this.addressService.updateAddress(adressDataToUpdate, address._id).subscribe(
      data => {
        //window.location.reload();
        const index = this.userAddresses.findIndex(addr => addr._id === address._id);
        if (index !== -1) {
          this.userAddresses[index] = data;  // Reemplaza el objeto antiguo con el nuevo
          this.userAddresses[index]._id = address._id;
        }
        console.log('Dirección actualizada con éxito:', data);
      },
      error =>{
        console.error('Error al actualizar la dirección:', error);
      }
    )
  }

  async onSetMainAddress(address: any){
    if (!address || !address._id) {
      console.error('Dirección no válida:', address);
      return;
    }

    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    const stringVacio = "";

    this.addressService.setMainAddress(address._id).subscribe(
      data => {
        this.userAddresses.forEach(addr => {
          
          addr.main_address = (addr._id === address._id);
        });
      
        console.log('Dirección actualizada con éxito:', data);
      },
      error => {
        console.error('Error al actualizar la dirección:', error);
      }
    )
  }
  
}
