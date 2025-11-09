import {Component, inject, input} from '@angular/core';
import {Product} from '../../models/product.model';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {EcommerceStore} from '../../ecommerce-store';

@Component({
  selector: 'app-product-card',
  imports: [
    MatButton,
    MatIcon
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {

  product = input.required<Product>();

  store = inject(EcommerceStore);

  onAddToCart() {
    this.store.addToCart(this.product());
  }

}
