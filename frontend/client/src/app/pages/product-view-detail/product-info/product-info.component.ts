import {Component, inject, input, OnInit, signal} from '@angular/core';
import {Product} from '../../../models/product.model';
import {AsyncPipe, TitleCasePipe} from '@angular/common';
import {StockStatusComponent} from '../stock-status/stock-status.component';
import {QtySelectorComponent} from '../../../components/qty-selector/qty-selector.component';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {
  ToggleWishlistButtonComponent
} from '../../../components/toggle-wishlist-button/toggle-wishlist-button.component';
import {CartService} from '../../../services/cart.service';
import {WishlistService} from '../../../services/wishlist.service';
import {WishlistCountService} from '../../../services/wishlist-count.service';
import {AuthService} from '../../../services/auth.service';
import {CartCountService} from '../../../services/cart/cart-count.service';
import {ToasterService} from '../../../services/toaster.service';

@Component({
  selector: 'app-product-info',
  imports: [
    TitleCasePipe,
    StockStatusComponent,
    QtySelectorComponent,
    MatButton,
    MatIcon,
    ToggleWishlistButtonComponent,
    AsyncPipe
  ],
  templateUrl: './product-info.component.html',
  styleUrl: './product-info.component.scss',
})
export class ProductInfoComponent implements OnInit {
  private _cartService = inject(CartService);
  private _cartCountService = inject(CartCountService);
  private _toaster = inject(ToasterService);
  private _wishlistService = inject(WishlistService);
  private _wishlistCountService = inject(WishlistCountService);

  authService = inject(AuthService);
  product = input.required<Product>();
  quantity = signal<number>(1);
  wishlistProducts = signal<Product[]>([]);

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this._loadWishlist();
    }
  }

  onAddToCart() {
    this._cartService.addNewProductToCart(this.product().id).subscribe(() => {
      this._cartCountService.setCount(this._cartCountService.getCount() + this.quantity());
      this._toaster.success('Product added to cart');
    });
  }

  onWishlistChange() {
    this._loadWishlist();
  }

  private _loadWishlist() {
    this._wishlistService.getWishlistProducts().subscribe(products => {
      this.wishlistProducts.set(products);
      this._wishlistCountService.setCount(products.length);
    });
  }
}
