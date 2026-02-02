import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from './layout/header/header.component';
import {CartService} from './services/cart.service';
import {CartCountService} from './services/cart/cart-count.service';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private readonly _authService = inject(AuthService);
  private readonly _cartService = inject(CartService);
  private readonly _cartCountService = inject(CartCountService);

  ngOnInit() {
    if (this._authService.isAuthenticated()) {
      this._cartService.getCartProducts().subscribe(cartItems => {
        const quantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
        this._cartCountService.setCount(quantity);
      });
    }
  }

}
