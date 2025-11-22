import {Component, inject, input, OnInit, signal} from '@angular/core';
import {ProductCardComponent} from '../../components/product-card/product-card.component';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatListItem, MatListItemTitle, MatNavList} from '@angular/material/list';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {TitleCasePipe} from '@angular/common';
import {ToggleWishlistButtonComponent} from '../../components/toggle-wishlist-button/toggle-wishlist-button.component';
import {ProductService} from '../../services/product.service';
import {Product} from '../../models/product.model';
import {EcommerceStore} from '../../ecommerce-store';
import {WishlistService} from '../../services/wishlist.service';
import {WishlistCountService} from '../../services/wishlist-count.service';

@Component({
  selector: 'app-products-grid',
  imports: [
    ProductCardComponent,
    MatSidenavContainer,
    MatSidenavContent,
    MatSidenav,
    MatNavList,
    MatListItem,
    MatListItemTitle,
    RouterLink,
    TitleCasePipe,
    ToggleWishlistButtonComponent
  ],
  templateUrl: './products-grid.component.html',
  styleUrl: './products-grid.component.scss',
})
export default class ProductsGridComponent implements OnInit {

  private _productService = inject(ProductService);
  private _wishlistService = inject(WishlistService);
  private _wishlistCountService = inject(WishlistCountService);
  private _route = inject(ActivatedRoute);
  private _store = inject(EcommerceStore);

  products = signal<Product[]>([]);
  wishlistProducts = signal<Product[]>([]);
  protected category = input<string | undefined>(undefined);
  protected categories = signal<(string | undefined)[]>([undefined, 'electronics', 'clothing', 'accessories', 'home']);

  ngOnInit() {
    this._route.queryParams.subscribe((params) => {
      const category = params['category'];
      this._store.setCategory(category);
      this._loadProducts(category);
      this.loadWishlistProducts();
    });
  }

  protected getCurrentCategory() {
    return this._store.category();
  }

  private _loadProducts(category: string | undefined) {
    this._productService.getProducts(category).subscribe(products => {
      this.products.set(products);
    });
  }

  protected loadWishlistProducts() {
    this._wishlistService.getWishlistProducts().subscribe(products => {
      this.wishlistProducts.set(products);
      this._wishlistCountService.setCount(products.length);
    });
  }

}
