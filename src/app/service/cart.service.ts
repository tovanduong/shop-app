import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: any[] = [];

  constructor() {}

  addToCart(item: any) {
    this.cartItems.push(item);
  }

  removeFromCart(itemId: number) {
    this.cartItems = this.cartItems.filter((item) => item.id !== itemId);
  }

  clearCart() {
    this.cartItems = [];
  }

  getCartItems() {
    return this.cartItems;
  }
}
