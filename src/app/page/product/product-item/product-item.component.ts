import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../model/product.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css',
})
export class ProductItemComponent {
  @Input() product: Product;
  @Output() addCart = new EventEmitter<Product>();
  currentDate = new Date();
  addToCart(product: Product) {
    this.addCart.emit(product);
  }
}
