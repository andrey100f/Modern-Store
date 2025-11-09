import {Component, inject, input, signal} from '@angular/core';
import {ProductCardComponent} from '../../components/product-card/product-card.component';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatListItem, MatListItemTitle, MatNavList} from '@angular/material/list';
import {RouterLink} from '@angular/router';
import {TitleCasePipe} from '@angular/common';
import {EcommerceStore} from '../../ecommerce-store';
import {ToggleWishlistButtonComponent} from '../../components/toggle-wishlist-button/toggle-wishlist-button.component';

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
export default class ProductsGridComponent {

  category = input<string>('all');

  store = inject(EcommerceStore);

  categories = signal<string[]>(['all', 'electronics', 'clothing', 'accessories', 'home']);

  constructor() {
    this.store.setCategory(this.category);
  }
}
