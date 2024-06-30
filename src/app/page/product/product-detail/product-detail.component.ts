import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../service/product.service';
import { BreadcrumbService } from '../../../service/breadcrumb.service';
import { CartService } from '../../../service/cart.service';
import { Product } from '../../../model/product.model';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent implements OnInit {
  id: string = '';
  product: Product;
  // quantity: number = 0;
  breadcrumbs = [];
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private breadcrumbService: BreadcrumbService
  ) {}

  ngOnInit(): void {
    // Get the id parameter from the route
    const id = this.route.snapshot.paramMap.get('id');
    this.id = id;
    this.getProductById();
    const breadcrumbs = [
      { label: 'Home', url: '/' },
      { label: 'Product', url: `/product/${id}` }, // Example URL
    ];
    this.breadcrumbService.setBreadcrumbs(breadcrumbs);
    this.breadcrumbService.breadcrumbs.subscribe(
      (br) => (this.breadcrumbs = br)
    );
  }

  getProductById() {
    this.productService
      .getProductById(this.id)
      .subscribe((product) => (this.product = product));
  }
  addToCart(product: Product) {
    // this.quantity = this.quantity + 1;
    this.cartService.addToCart(product).subscribe((cart) => {
      this.cartService.updateCart(cart.cart);
      localStorage.setItem('cart', JSON.stringify(cart));
    });
  }
  removeItem(product: Product) {
    // if (!this.quantity) return;
    // this.quantity = this.quantity - 1;
    this.cartService.removeFromCart(product);
    this.cartService.removeFromCart(product).subscribe((cart) => {
      this.cartService.updateCart(cart.cart);
      localStorage.setItem('cart', JSON.stringify(cart));
    });
  }
}
