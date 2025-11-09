import {Component, computed, inject, input} from '@angular/core';
import {Product} from '../../models/product.model';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {EcommerceStore} from '../../ecommerce-store';

@Component({
  selector: 'app-product-card',
  imports: [
    MatButton,
    MatIcon,
    MatIconButton
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {

  product = input.required<Product>();

  store = inject(EcommerceStore);

  isInWishlist = computed(() => this.store.wishlistItems().find(p => p.id === this.product().id));

  toggleWishlist(product: Product) {
    if (this.isInWishlist()) {
      this.store.removeFromWishlist(product);
    } else {
      this.store.addToWishlist(product);
    }
  }

}
