import {ResolveFn} from '@angular/router';
import {inject} from '@angular/core';
import {CartService} from '../services/cart.service';
import {firstValueFrom} from 'rxjs';
import {CartCountService} from '../services/cart/cart-count.service';

export const cartResolver: ResolveFn<void> = async () => {
  const cartService = inject(CartService);
  const cartCountService = inject(CartCountService);
  const cartItems = await firstValueFrom(cartService.getCartProducts());
  cartCountService.setCount(cartItems.length);
}
