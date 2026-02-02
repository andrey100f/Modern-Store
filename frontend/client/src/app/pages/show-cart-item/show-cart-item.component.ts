import {Component, computed, inject, input, output} from '@angular/core';
import {CartItem} from '../../models/cart-item.model';
import {QtySelectorComponent} from '../../components/qty-selector/qty-selector.component';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {Product} from '../../models/product.model';
import {CartService} from '../../services/cart.service';

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
  private _cartService = inject(CartService);
  item = input.required<CartItem>();
  cartChanged = output<boolean>();
  wishlistChanged = output<boolean>();

  total = computed(() => (this.item().product.price * this.item().quantity).toFixed(2));

  onUpdateQty(operation: string) {
    if (operation === 'ADD') {
      this._cartService.addProductToCart(this.item().product.id).subscribe(() => {
        this.cartChanged.emit(true);
      });
    } else if (operation === 'REMOVE') {
      this._cartService.removeProductFromCart(this.item().product.id).subscribe(() => {
        this.cartChanged.emit(true);
      });
    }
  }

  onMoveToWishlist(product: Product) {
    this._cartService.moveProductFromCartToWishlist(product.id).subscribe(() => {
      this.cartChanged.emit(true);
      this.wishlistChanged.emit(true);
    });
  }

  onRemoveFromCart(product: Product) {
    this._cartService.clearProductFromCart(product.id).subscribe(() => {
      this.cartChanged.emit(true);
    });
  }

}
