import {Component, computed, inject, input} from '@angular/core';
import {CartItem} from '../../models/cart-item.model';
import {QtySelectorComponent} from '../../components/qty-selector/qty-selector.component';
import {EcommerceStore} from '../../ecommerce-store';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {Product} from '../../models/product.model';

@Component({
  selector: 'app-show-cart-item',
  imports: [
    QtySelectorComponent,
    MatIconButton,
    MatIcon
  ],
  templateUrl: './show-cart-item.component.html',
  styleUrl: './show-cart-item.component.scss',
})
export class ShowCartItemComponent {
  store = inject(EcommerceStore);
  item = input.required<CartItem>();

  total = computed(() => (this.item().product.price * this.item().quantity).toFixed(2));

  onUpdateQty(newQty: number) {
    const updated = {
      productId: this.item().product.id,
      quantity: newQty
    }
    this.store.setItemQuantity(updated);
  }

  onMoveToWishlist(product: Product) {
    this.store.moveToWishlist(product);
  }

  onRemoveFromCart(product: Product) {
    this.store.removeFromCart(product);
  }

}
