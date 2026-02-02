import {inject, Injectable, signal} from '@angular/core';
import {CartService} from '../cart.service';

@Injectable({
  providedIn: 'root'
})
export class CartCountService {
  private _cartService = inject(CartService);
  private _count = signal<number>(0);

  setCount(newCount: number): void {
    this._count.set(newCount);
  }

  getCount(): number {
    return this._count();
  }

  refreshCount(): void {
    this._cartService.getCartProducts().subscribe(cartItems => {
      const quantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
      this.setCount(quantity);
    });
  }

}
