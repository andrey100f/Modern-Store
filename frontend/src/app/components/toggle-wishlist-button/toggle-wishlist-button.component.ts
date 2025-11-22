import {Component, computed, inject, input, output} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {Product} from '../../models/product.model';
import {WishlistService} from '../../services/wishlist.service';

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

  private _wishlistService = inject(WishlistService);

  product = input.required<Product>();
  wishlistProducts = input<Product[]>([]);
  wishlistChanged = output<boolean>();

  protected isInWishlist = computed(() =>
    this.wishlistProducts().find(p => p.id === this.product().id));

  toggleWishlist(product: Product) {
    if (!this.isInWishlist()) {
      this._addToWishlist(product);
    } else {
      this._removeFromWishlist(product);
    }
  }

  private _addToWishlist(product: Product) {
    this._wishlistService.addProductToWishlist(product.id).subscribe(() => {
      this.wishlistChanged.emit(true);
    });
  }

  private _removeFromWishlist(product: Product) {
    this._wishlistService.removeProductFromWishlist(product.id).subscribe(() => {
      this.wishlistChanged.emit(true);
    });
  }

}
