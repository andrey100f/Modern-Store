import {Injectable, signal} from '@angular/core';
import {CartItem} from '../../models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartGlobalService {
  private _cartItems = signal<CartItem[]>([]);

  setCartItems(cartItems: CartItem[]): void {
    this._cartItems.set(cartItems);
  }

  getCartItems(): CartItem[] {
    return this._cartItems();
  }
}
