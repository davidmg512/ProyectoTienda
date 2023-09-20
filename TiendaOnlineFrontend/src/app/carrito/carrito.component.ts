import { Component } from '@angular/core';
import { CarritoServiceService } from '../services/carrito-service.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  constructor(private carritoService: CarritoServiceService){}

  ngOnInit(): void {
    // Accede a los elementos del carrito aquí
    const carritoItems = this.carritoService.getCarritoItems();
    console.log(carritoItems);
  }
  
}
