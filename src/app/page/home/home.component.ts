import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  // cartItems: Product[] = [];
  // constructor(private cartService: CartService) {}
  // ngOnInit(): void {
  //   const user = JSON.parse(localStorage.getItem('user'));
  //   if (user) {
  //     this.cartService.getCartByUser(user.cartId).subscribe((cart) => {
  //       this.cartItems = cart.cart;
  //       this.cartService.updateCart(this.cartItems);
  //       localStorage.setItem('cart', JSON.stringify(this.cartItems));
  //     });
  //   }
  // }
}
