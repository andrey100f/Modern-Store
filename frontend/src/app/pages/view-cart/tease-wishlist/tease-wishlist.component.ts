import {Component, inject} from '@angular/core';
import {ViewPanelDirective} from '../../../directives/view-panel.directive';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {WishlistCountService} from '../../../services/wishlist-count.service';
import {WishlistService} from '../../../services/wishlist.service';
import {EcommerceStore} from '../../../ecommerce-store';

@Component({
  selector: 'app-tease-wishlist',
  imports: [
    ViewPanelDirective,
    MatIcon,
    MatButton,
    RouterLink
  ],
  templateUrl: './tease-wishlist.component.html',
  styleUrl: './tease-wishlist.component.scss',
})
export class TeaseWishlistComponent {
  store = inject(EcommerceStore);
  private _wishlistCountService = inject(WishlistCountService);
  private _wishlistService = inject(WishlistService);

  wishlistCount() {
    return this._wishlistCountService.getCount();
  }

  onAddAllFromWishlistToCart() {
    this._wishlistService.clearWishlist();
    this._wishlistCountService.setCount(0);
    // this.store.addAllWishlistToCart();
  }

}
