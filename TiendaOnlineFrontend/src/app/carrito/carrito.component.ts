import { Component } from '@angular/core';
import { CarritoServiceService } from '../services/carrito-service.service';
import { Producto, CarritoProducto } from '../model/producto';
import { Direccion } from '../model/direccion';
import { AddressService } from '../services/address.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {

  productos: CarritoProducto[] = [];
  direcciones: Direccion[] = [];
  selectedAddress: Direccion | null = null;


  constructor(private carritoService: CarritoServiceService, private addressService:AddressService){}

  ngOnInit(): void {
    this.obtenerProductos();
    this.obtenerDirecciones();
  }

  obtenerProductos(){
    this.productos = this.carritoService.getCarritoItems();
  }

  obtenerDirecciones(){
    this.addressService.getAddresses().subscribe(
      response => {
        this.direcciones = response.data;
        this.setDefaultAddress();
      },
      error => {
        console.log(error);
        console.log("Error al obtener las direcciones.");
      }
    )
  }

  setDefaultAddress() {
    // Establecer la dirección predeterminada si está disponible
    const defaultAddress = this.direcciones.find(address => address.main_address);
    this.selectedAddress = defaultAddress || null;
  }

  disminuirCantidad(item: CarritoProducto){
    var nuevaCantidad = item.cantidad - 1;

    if (nuevaCantidad > 0 && item.id !== undefined) {
      this.carritoService.updateCartItem(item.id, nuevaCantidad);
    }
  }

  aumentarCantidad(item: CarritoProducto){
    var nuevaCantidad = item.cantidad + 1;

    if (item.id !== undefined) {
      this.carritoService.updateCartItem(item.id, nuevaCantidad);
    }
  }

  eliminarProducto(item: CarritoProducto){
    if(item.id !== undefined){
      this.carritoService.deleteCarritoItem(item.id);
    }
    
    this.obtenerProductos();
  }

  calcularTotal(): number {
    var total = 0;
    for (let product of this.productos) {
      
      total +=product.precio * product.cantidad;
    }
    return total;
  }

  pagar(){
    this.carritoService.pagarPedido(this.selectedAddress);
  };
  
}
