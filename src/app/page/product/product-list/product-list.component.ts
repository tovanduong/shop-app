import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { CartService } from '../../../service/cart.service';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../../../service/product.service';
import { Product } from '../../../model/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  isLoggedIn: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private cartService: CartService,
    private productService: ProductService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getAllProduct();
    this.authService.isLoggedIn().subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }

  getAllProduct() {
    this.productService.getAllProduct().subscribe((products) => {
      this.products = products;
    });
  }
  addToCartList(product: Product) {
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
    } else {
      this.cartService.addToCart(product).subscribe((cart) => {
        this.cartService.updateCart(cart.cart);
        localStorage.setItem('cart', JSON.stringify(cart));
      });
      // alert('Product added to cart!');
    }
  }
}
