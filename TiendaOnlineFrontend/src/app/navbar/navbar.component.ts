import { Component } from '@angular/core';
import { UserServiceTsService } from '../services/user.service.ts.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CarritoComponent } from '../carrito/carrito.component';
import { CarritoServiceService } from '../services/carrito-service.service';
import { CarritoListaComponent } from '../carrito-lista/carrito-lista.component';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  stringToken: string | null = "";
  cartItemCount: number = 0;
  isCarritoListaVisible: boolean = false;
  private hideTimeout: any;

  constructor(private UserServiceTsService: UserServiceTsService,
    private router: Router, activerouter:ActivatedRoute,public translate: TranslateService, private carritoService: CarritoServiceService) {
      this.carritoService.cartItems$.subscribe(items => {
        this.cartItemCount = items.length;
      });
    }

  onClick(){
    this.UserServiceTsService.logout()
    .then(response =>{
      localStorage.clear();
      sessionStorage.clear();
      this.router.navigate(['']);
})
    .catch(error => console.log(error));

  }

  reloadPage() {
    window.location.reload();
  }

  onCartIconClick(event: MouseEvent): void {
    // Si el clic es en el icono, no se propaga
    event.stopPropagation(); // Detener la propagación para evitar que el clic en el icono active el enlace
    // El enlace se activará por el routerLink en el icono
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('lenguaje',lang);
  }

  ngOnInit(): void {
    this.UserServiceTsService.checkLenguaje();

      if(localStorage.getItem('token') !== null){
        this.stringToken = localStorage.getItem('token');
        if(this.stringToken !== null){
          sessionStorage.setItem('token',this.stringToken);
        }
      }
    }

    showCarritoLista() {
      clearTimeout(this.hideTimeout);
      this.isCarritoListaVisible = true;
      console.log('Tooltip visible');
    }
  
    hideCarritoLista() {
      this.hideTimeout = setTimeout(() => {
        this.isCarritoListaVisible = false;
        console.log('Tooltip hidden');
      }, 700);
      
    }

    ngOnDestroy() {
      clearTimeout(this.hideTimeout);
    }

    
}
