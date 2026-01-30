import {Component, inject, input} from '@angular/core';
import {Product} from '../../models/product.model';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {EcommerceStore} from '../../ecommerce-store';
import {RouterLink} from '@angular/router';
import {CartService} from '../../services/cart.service';
import {ToasterService} from '../../services/toaster.service';
import {CartCountService} from '../../services/cart/cart-count.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-product-card',
  imports: [
    MatButton,
    MatIcon,
    RouterLink
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  private _cartService = inject(CartService);
  private _cartCountService = inject(CartCountService);
  private _toaster = inject(ToasterService);

  product = input.required<Product>();
  authService = inject(AuthService);

  store = inject(EcommerceStore);

  onAddToCart(event: MouseEvent) {
    event.stopPropagation();
    this._cartService.addProductToCart(this.product().id).subscribe(() => {
      this._cartCountService.setCount(this._cartCountService.getCount() + 1);
      this._toaster.success('Product added to cart');
    });
  }

}
