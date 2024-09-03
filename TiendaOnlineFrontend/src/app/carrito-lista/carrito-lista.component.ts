import { Component } from '@angular/core';
import { CarritoServiceService } from '../services/carrito-service.service';

@Component({
  selector: 'app-carrito-lista',
  templateUrl: './carrito-lista.component.html',
  styleUrls: ['./carrito-lista.component.css']
})
export class CarritoListaComponent {
  productos: any[] = [];
  productosMostrar: any[] = [];

  constructor(private carritoService: CarritoServiceService) { }

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
      
      total += parseFloat(product.Precio) * product.cantidad;
    }
    return total;
  }

  pagar(){}
}
