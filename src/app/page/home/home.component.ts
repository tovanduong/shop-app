import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../service/auth.service';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: any[] = [];
  isLoggedIn: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private cartService: CartService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.http
      .get<any[]>('http://localhost:3000/products')
      .subscribe((products) => {
        this.products = products;
      });

    // this.authService.isLoggedIn().subscribe((loggedIn) => {
    //   this.isLoggedIn = loggedIn;
    // });
  }

  addToCart(product: any) {
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
    } else {
      this.cartService.addToCart(product);
      alert('Product added to cart!');
    }
  }
}
