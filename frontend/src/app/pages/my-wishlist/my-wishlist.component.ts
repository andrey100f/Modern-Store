import {Component, inject, OnInit, signal} from '@angular/core';
import {BackButtonComponent} from '../../components/back-button/back-button.component';
import {ProductCardComponent} from '../../components/product-card/product-card.component';
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatIconButton} from '@angular/material/button';
import {EmptyWishlistComponent} from './empty-wishlist/empty-wishlist.component';
import {WishlistService} from '../../services/wishlist.service';
import {Product} from '../../models/product.model';
import {WishlistCountService} from '../../services/wishlist-count.service';
import {ToasterService} from '../../services/toaster.service';

@Component({
  selector: 'app-my-wishlist',
  imports: [
    BackButtonComponent,
    ProductCardComponent,
    MatIcon,
    MatIconButton,
    MatButton,
    EmptyWishlistComponent
  ],
  templateUrl: './my-wishlist.component.html',
  styleUrl: './my-wishlist.component.scss',
})
export default class MyWishlistComponent implements OnInit {

  private _wishlistService = inject(WishlistService);
  private _wishlistCountService = inject(WishlistCountService);
  private _toaster = inject(ToasterService);

  protected wishlistItems = signal<Product[]>([]);

  ngOnInit(): void {
    this._loadWishlistItems();
  }

  protected removeWishlistItem(product: Product) {
    this._wishlistService.removeProductFromWishlist(product.id).subscribe(() => {
      this._toaster.success('Product removed from wishlist');
      this._loadWishlistItems();
    });
  }

  protected clearWishlist() {
    this._wishlistService.clearWishlist().subscribe(() => {
      this._toaster.success('Wishlist cleared');
      this.wishlistItems.set([]);
      this._wishlistCountService.setCount(0);
    });
  }

  private _loadWishlistItems() {
    this._wishlistService.getWishlistProducts().subscribe(products => {
      this.wishlistItems.set(products);
      this._wishlistCountService.setCount(products.length);
    });
  }

}
