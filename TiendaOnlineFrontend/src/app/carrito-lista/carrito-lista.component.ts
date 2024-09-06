import { Component } from '@angular/core';
import { CarritoServiceService } from '../services/carrito-service.service';
import { AddressService } from '../services/address.service';

@Component({
  selector: 'app-carrito-lista',
  templateUrl: './carrito-lista.component.html',
  styleUrls: ['./carrito-lista.component.css']
})
export class CarritoListaComponent {
  productos: any[] = [];
  productosMostrar: any[] = [];

  constructor(private carritoService: CarritoServiceService, private addressService: AddressService) { }

  ngOnInit(): void {
    this.actualizarCarrito();
  }

  borrarItem(idProducto: number){
    this.carritoService.deleteCarritoItem(idProducto);
    this.actualizarCarrito();
  }

  actualizarCarrito(){
    this.productos = this.carritoService.getCarritoItems();
  }

  calcularCantidadProductos(producto: any): number {
    return this.productos.filter(p => p.nombre === producto.nombre).length;
  }

  calcularTotal(): number {
    var total = 0;
    for (let product of this.productos) {
      
      total += parseFloat(product.precio) * product.cantidad;
    }
    return total;
  }

  pagar(){
    this.addressService.getMainAddress().subscribe(
      response => {
        
        if(!response.message || response.message != "Main address not found"){
          this.carritoService.pagarPedido(response);
        }
        
       
      },
      error => {
        console.log(error);
        console.log("No se ha podido obtener la dirección principal.");
      }
    );

    
  };
}
