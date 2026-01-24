import {Component, inject, input, signal} from '@angular/core';
import {Product} from '../../../models/product.model';
import {TitleCasePipe} from '@angular/common';
import {StockStatusComponent} from '../stock-status/stock-status.component';
import {QtySelectorComponent} from '../../../components/qty-selector/qty-selector.component';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {EcommerceStore} from '../../../ecommerce-store';
import {produce} from 'immer';
import {
  ToggleWishlistButtonComponent
} from '../../../components/toggle-wishlist-button/toggle-wishlist-button.component';
import {CartService} from '../../../services/cart.service';

@Component({
  selector: 'app-product-info',
  imports: [
    TitleCasePipe,
    StockStatusComponent,
    QtySelectorComponent,
    MatButton,
    MatIcon,
    ToggleWishlistButtonComponent,
    MatIconButton
  ],
  templateUrl: './product-info.component.html',
  styleUrl: './product-info.component.scss',
})
export class ProductInfoComponent {
  private _cartService = inject(CartService);

  product = input.required<Product>();
  quantity = signal<number>(1);
  store = inject(EcommerceStore);

  onAddToCart() {
    this._cartService.addNewProductToCart(this.product().id);
  }
}
