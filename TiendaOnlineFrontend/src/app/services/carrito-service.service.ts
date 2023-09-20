import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoServiceService {
  constructor() { }

  private cartItems: any[] = [];
  private cartItemsSubject = new BehaviorSubject<any[]>([]);

  cartItems$ = this.cartItemsSubject.asObservable();

  addToCart(item: any) {
    this.cartItems.push(item);
    this.cartItemsSubject.next(this.cartItems);
  }

  getCarritoItems(): any[] {
    return this.cartItems;
  }

  deleteCarritoItem(id: number){
    this.cartItems = this.cartItems.filter(producto => producto.id !== id);
    this.cartItemsSubject.next(this.cartItems);
  }
}
