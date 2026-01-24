import {Component, inject, output} from '@angular/core';
import {ViewPanelDirective} from '../../../directives/view-panel.directive';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {WishlistCountService} from '../../../services/wishlist-count.service';
import {WishlistService} from '../../../services/wishlist.service';
import {CartGlobalService} from '../../../services/cart/cart-global.service';
import {CartService} from '../../../services/cart.service';
import {switchMap, tap} from 'rxjs';
import {CartRefreshService} from '../../../services/cart/cart-refresh.service';

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
  private _wishlistCountService = inject(WishlistCountService);
  private _wishlistService = inject(WishlistService);
  private _cartRefresh = inject(CartRefreshService);

  wishlistCount() {
    return this._wishlistCountService.getCount();
  }

  // onAddAllFromWishlistToCart() {
  //   this._wishlistService.getWishlistProducts().subscribe(products => {
  //     this._wishlistService.moveProductsToCart(products).subscribe(() => {
  //       this._cartService.getCartProducts().subscribe((cartProducts) => {
  //         this._cartGlobalService.setCartItems(cartProducts);
  //       });
  //     });
  //   });
  // }

  onAddAllFromWishlistToCart() {
    this._wishlistService.getWishlistProducts().pipe(
      switchMap(products => this._wishlistService.moveProductsToCart(products)),
      tap(() => this._cartRefresh.trigger())
    ).subscribe();
  }

}
