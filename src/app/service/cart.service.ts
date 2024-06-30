import { Injectable, OnInit } from '@angular/core';
import { Product } from '../model/product.model';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user.model';
import { cart, cartInfo } from '../model/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService implements OnInit {
  private cartItems: cartInfo[] = [];
  cart!: cart;
  apiUrl = 'http://localhost:3000/cart';
  constructor(private http: HttpClient) {
    // // Kiểm tra localStorage để cập nhật trạng thái đăng nhập ban đầu khi load lại trang
    const cart = JSON.parse(localStorage.getItem('cart'));
    this.cart = cart;
    if (cart?.cart?.length) this.cartItems = cart?.cart;
  }

  ngOnInit(): void {}
  updateCart(cartList: cartInfo[]) {
    this.cartItems = cartList;
  }
  getCartByUser(cartId) {
    return this.http.get<any>(`${this.apiUrl}/${cartId}`);
  }
  addToCart(product: Product, quantity: number = 1) {
    let found = false;
    for (let item of this.cartItems) {
      if (item.id === product.id) {
        item.quantity = item.quantity + quantity;
        found = true;
        break;
      }
    }

    // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới vào
    if (!found) {
      this.cartItems.push({ ...product, quantity: 1 });
    }
    // this.cartItems.push(item);
    return this.http.put<any>(`${this.apiUrl}/${this.cart.id}`, {
      id: this.cart.id,
      name: this.cart.name,
      cart: this.cartItems,
    });
  }

  removeFromCart(product: Product, quantity: number = 1) {
    for (let i = 0; i < this.cartItems.length; i++) {
      if (this.cartItems[i].id === product.id) {
        if (this.cartItems[i].quantity > 1) {
          this.cartItems[i].quantity = this.cartItems[i].quantity - quantity;
        } else {
          this.cartItems.splice(i, 1); // Xóa sản phẩm khỏi giỏ hàng nếu số lượng là 1
        }
        break;
      }
    }
    return this.http.patch<any>(`${this.apiUrl}/${this.cart.id}`, {
      id: this.cart.id,
      name: this.cart.name,
      cart: this.cartItems,
    });
  }

  clearCart() {
    this.cartItems = [];
  }

  getTotalItems() {
    let totalItems = 0;
    for (let item of this.cartItems) {
      totalItems += item.quantity;
    }
    return totalItems;
  }

  getCartItems() {
    return this.cartItems;
  }
}
