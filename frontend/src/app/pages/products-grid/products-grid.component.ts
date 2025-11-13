import {Component, inject, input, OnInit, signal} from '@angular/core';
import {ProductCardComponent} from '../../components/product-card/product-card.component';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatListItem, MatListItemTitle, MatNavList} from '@angular/material/list';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {TitleCasePipe} from '@angular/common';
import {ToggleWishlistButtonComponent} from '../../components/toggle-wishlist-button/toggle-wishlist-button.component';
import {ProductService} from '../../services/product.service';
import {Product} from '../../models/product.model';

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
  private _route = inject(ActivatedRoute);

  protected products = signal<Product[]>([]);

  category = input<string | undefined>(undefined);
  categories = signal<string[]>(['', 'electronics', 'clothing', 'accessories', 'home']);

  ngOnInit() {
    this._route.queryParams.subscribe(params => {
      const category = params['category'] ?? undefined;
      this._loadProducts(category);
    })
  }

  private _loadProducts(category: string) {
    this._productService.getProducts(category).subscribe(products => {
      this.products.set(products);
    });
  }

}
