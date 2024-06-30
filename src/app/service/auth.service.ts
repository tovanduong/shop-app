import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { CartService } from './cart.service';
import { Product } from '../model/product.model';
import { cart } from '../model/cart.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users'; // URL của JSON Server
  private loggedIn = new BehaviorSubject<boolean>(false);
  authChanged = this.loggedIn.asObservable();
  cartItems: cart;
  constructor(
    private http: HttpClient,
    private router: Router,
    private cartService: CartService
  ) {
    // // Kiểm tra localStorage để cập nhật trạng thái đăng nhập ban đầu khi load lại trang
    const user = JSON.parse(localStorage.getItem('user'));
    this.loggedIn.next(!!user);
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http
      .get<any[]>(`${this.apiUrl}?username=${username}&password=${password}`)
      .pipe(
        map((users) => {
          if (users.length > 0) {
            // Đăng nhập thành công nếu có người dùng trùng khớp
            this.loggedIn.next(true);
            localStorage.setItem('user', JSON.stringify(users[0]));
            this.cartService
              .getCartByUser(users[0].cartId)
              .subscribe((cart) => {
                this.cartItems = cart;
                this.cartService.updateCart(this.cartItems.cart);
                localStorage.setItem('cart', JSON.stringify(this.cartItems));
              });
            return true;
          } else {
            // Đăng nhập thất bại nếu không có người dùng trùng khớp
            this.loggedIn.next(false);
            return false;
          }
        }),
        catchError(() => {
          // Xử lý lỗi nếu có
          this.loggedIn.next(false);
          return of(false);
        })
      );
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('user');
    return !!token;
  }

  // logout() {
  //   localStorage.removeItem('user');
  //   this.loggedIn.next(false);
  //   this.router.navigate(['/login']);
  // }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  logout(): Observable<boolean> {
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    this.loggedIn.next(false);
    return this.loggedIn.asObservable();
  }
}
