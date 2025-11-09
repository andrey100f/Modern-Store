import {Component, computed, inject, input} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {EcommerceStore} from '../../ecommerce-store';
import {Product} from '../../models/product.model';

@Component({
  selector: 'app-toggle-wishlist-button',
  imports: [
    MatIcon,
    MatIconButton
  ],
  templateUrl: './toggle-wishlist-button.component.html',
  styleUrl: './toggle-wishlist-button.component.scss',
})
export class ToggleWishlistButtonComponent {

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
