import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../service/cart.service';
import { BreadcrumbService } from '../../../service/breadcrumb.service';
import { Product } from '../../../model/product.model';
import { cartInfo } from '../../../model/cart.model';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.css',
})
export class CartListComponent implements OnInit {
  cartItems: cartInfo[] = [];
  breadcrumbs = [];
  isLoading = false;
  constructor(
    private cartService: CartService,
    private breadcrumbService: BreadcrumbService
  ) {}
  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    const breadcrumbs = [
      { label: 'Home', url: '/' },
      { label: 'Cart', url: `/cart` }, // Example URL
    ];
    this.breadcrumbService.setBreadcrumbs(breadcrumbs);
    this.breadcrumbService.breadcrumbs.subscribe(
      (br) => (this.breadcrumbs = br)
    );
  }
  addToCart(product: Product) {
    console.log(this.cartItems);
    this.isLoading = true;
    this.cartService.addToCart(product).subscribe((cart) => {
      this.cartItems = cart.cart;
      this.cartService.updateCart(this.cartItems);
      this.isLoading = false;
      localStorage.setItem('cart', JSON.stringify(cart));
    });
  }
  removeItem(product: Product) {
    this.isLoading = true;
    this.cartService.removeFromCart(product).subscribe((cart) => {
      this.cartItems = cart.cart;
      this.isLoading = false;
      this.cartService.updateCart(this.cartItems);
      localStorage.setItem('cart', JSON.stringify(cart));
    });
  }
}
