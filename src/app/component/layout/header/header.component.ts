import { Component } from '@angular/core';
import { CartService } from '../../../service/cart.service';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isLoggedIn = false;
  constructor(
    public cartService: CartService,
    private router: Router,
    public authService: AuthService
  ) {
    this.authService.isLoggedIn().subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }

  getCount() {
    const count = this.cartService.getTotalItems();
    return count || 0;
  }
  handleLogout() {
    this.authService.logout().subscribe((islogin) => {
      if (!islogin) {
        this.cartService.clearCart();
        this.router.navigate(['/login']);
      }
    });
  }
}
