import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto, CarritoProducto } from '../model/producto';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarritoServiceService {

  private cartItems: CarritoProducto[] = [];
  private cartItemsSubject = new BehaviorSubject<CarritoProducto[]>([]);

  cartItems$ = this.cartItemsSubject.asObservable();

  private baseUrl = "https://sushopbackend.vercel.app/";
  config = {};
  token: string | null;

  constructor(private http:HttpClient){

    this.token = localStorage.getItem('token'); 

    this.config = {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    };

    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      this.cartItems = JSON.parse(storedCartItems);
      this.cartItemsSubject.next(this.cartItems);
    }
  }

  addToCart(product: Producto, cantidad: number = 1) {
    const existingItem = this.cartItems.find(cartItem => cartItem.id === product.id);
    if (existingItem) {
      existingItem.cantidad += cantidad;
    } else {
      this.cartItems.push({ ...product, cantidad });
    }
    this.updateCartState();
  }

  getCarritoItems(): CarritoProducto[] {
    return this.cartItems;
  }

  deleteCarritoItem(id: number) {
    this.cartItems = this.cartItems.filter(producto => producto.id !== id);
    this.updateCartState();
  }

  updateCartItem(id: number, cantidad: number) {
    const existingItem = this.cartItems.find(cartItem => cartItem.id === id);
    if (existingItem) {
      existingItem.cantidad = cantidad;
      this.updateCartState();
    }
  }

  clearCarrito() {
    this.cartItems = [];
    this.updateCartState();
  }

  private updateCartState() {
    this.cartItemsSubject.next(this.cartItems);
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  pagarPedido(address:any){
    const cartItems = localStorage.getItem('cartItems');

    if (cartItems) {
      // Parsear los items del carrito a un objeto
      const parsedCartItems = JSON.parse(cartItems);
  
      // Realizar la solicitud POST al backend con los datos del pedido
      return this.http.post(`${this.baseUrl}orders`, {
        items: parsedCartItems,
        address
      }, this.config).subscribe(
        response => {
          console.log('Pedido creado con éxito.');
          localStorage.removeItem('cartItems');
          window.location.reload();
        },
        error => {
          console.error('Error al crear el pedido');
        }
      );
    } else {
      // Manejar el caso en que no haya elementos en el carrito
      console.error('No hay elementos en el carrito');
      return null;
    }

  }
}
