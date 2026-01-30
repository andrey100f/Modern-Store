import {Component, inject, OnInit, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from './layout/header/header.component';
import {CartService} from './services/cart.service';
import {CartCountService} from './services/cart/cart-count.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private readonly _cartService = inject(CartService);
  private readonly _cartCountService = inject(CartCountService);
  private readonly _token = localStorage.getItem('token');

  ngOnInit() {
    if (this._token) {
      this._cartService.getCartProducts().subscribe(cartItems => {
        this._cartCountService.setCount(cartItems.length);
      });
    }
  }

}
