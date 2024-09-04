import { Component } from '@angular/core';
import { CarritoServiceService } from '../services/carrito-service.service';
import { Producto, CarritoProducto } from '../model/producto';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {

  productos: CarritoProducto[] = [];

  constructor(private carritoService: CarritoServiceService){}

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(){
    this.productos = this.carritoService.getCarritoItems();
  }

  disminuirCantidad(item: CarritoProducto){
    var nuevaCantidad = item.cantidad - 1;

    if (nuevaCantidad > 0 && item.Id !== undefined) {
      this.carritoService.updateCartItem(item.Id, nuevaCantidad);
    }
  }

  aumentarCantidad(item: CarritoProducto){
    var nuevaCantidad = item.cantidad + 1;

    if (item.Id !== undefined) {
      this.carritoService.updateCartItem(item.Id, nuevaCantidad);
    }
  }

  eliminarProducto(item: CarritoProducto){
    if(item.Id !== undefined){
      this.carritoService.deleteCarritoItem(item.Id);
    }
    
    this.obtenerProductos();
  }

  calcularTotal(): number {
    var total = 0;
    for (let product of this.productos) {
      
      total +=product.Precio * product.cantidad;
    }
    return total;
  }

  pagar(){
    this.carritoService.pagarPedido();
  };
  
}
