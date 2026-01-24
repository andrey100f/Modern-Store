import {Component, inject, OnInit, signal} from '@angular/core';
import {ViewPanelDirective} from '../../../directives/view-panel.directive';
import {EcommerceStore} from '../../../ecommerce-store';
import {ShowCartItemComponent} from '../../show-cart-item/show-cart-item.component';
import {CartItem} from '../../../models/cart-item.model';
import {CartService} from '../../../services/cart.service';
import {CartCountService} from '../../../services/cart/cart-count.service';
import {Product} from '../../../models/product.model';
import {CartGlobalService} from '../../../services/cart/cart-global.service';

@Component({
  selector: 'app-list-cart-items',
  imports: [
    ViewPanelDirective,
    ShowCartItemComponent
  ],
  templateUrl: './list-cart-items.component.html',
  styleUrl: './list-cart-items.component.scss',
})
export class ListCartItemsComponent implements OnInit {
  private _cartService = inject(CartService);
  private _cartCountService = inject(CartCountService);
  private _cartGlobalService = inject(CartGlobalService);

  cartItems = signal<CartItem[]>([]);

  store = inject(EcommerceStore);

  ngOnInit(): void {
    this._fetchCartItems();
  }

  onCartChanged() {
    this._fetchCartItems();
  }

  cartCount() {
    return this._cartCountService.getCount();
  }

  private _fetchCartItems() {
    this._cartService.getCartProducts().subscribe(products => {
      this._cartCountService.setCount(products.length);
      this._cartGlobalService.setCartItems(products);
      this.cartItems.set(products);
    });
  }

  // cartItems(): Product[] {
  //   return this._cartService.getCartProducts();
  // }

}
