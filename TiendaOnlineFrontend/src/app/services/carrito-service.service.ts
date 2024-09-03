import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto, CarritoProducto } from '../model/producto';

@Injectable({
  providedIn: 'root'
})
export class CarritoServiceService {

  private cartItems: CarritoProducto[] = [];
  private cartItemsSubject = new BehaviorSubject<CarritoProducto[]>([]);

  cartItems$ = this.cartItemsSubject.asObservable();

  constructor(){
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      this.cartItems = JSON.parse(storedCartItems);
      this.cartItemsSubject.next(this.cartItems);
    }
  }

  addToCart(product: Producto, cantidad: number = 1) {
    const existingItem = this.cartItems.find(cartItem => cartItem.Id === product.Id);
    if (existingItem) {
      console.log(existingItem);
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
    this.cartItems = this.cartItems.filter(producto => producto.Id !== id);
    this.updateCartState();
  }

  updateCartItem(id: number, cantidad: number) {
    const existingItem = this.cartItems.find(cartItem => cartItem.Id === id);
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
}
