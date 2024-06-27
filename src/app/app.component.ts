// app.component.ts

import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { CartService } from './service/cart.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'my-new-app';
  isLoggedIn: boolean = false;
  showShoppingCart = false;

  constructor(
    private authService: AuthService,
    public cartService: CartService
  ) {}

  ngOnInit() {
    // Subscribe to login status changes
    // this.authService.authChanged.subscribe((loggedIn) => {
    //   this.isLoggedIn = loggedIn;
    // });

    // Check initial login status (optional)
    // this.authService.isLoggedIn().subscribe((status) => {
    //   this.isLoggedIn = status;
    // });
  }

  toggleCart() {
    this.showShoppingCart = !this.showShoppingCart;
  }

  // logout() {
  //   this.authService.logout();
  //   this.isLoggedIn = false; // Update isLoggedIn status locally
  // }
}
