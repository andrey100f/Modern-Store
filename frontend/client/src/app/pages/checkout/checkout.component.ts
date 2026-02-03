import {Component, inject, OnInit, signal} from '@angular/core';
import {BackButtonComponent} from '../../components/back-button/back-button.component';
import {ShippingFormComponent} from './shipping-form/shipping-form.component';
import {SummarizeOrderComponent} from '../../components/summarize-order/summarize-order.component';
import {CartService} from '../../services/cart.service';
import {CartItem} from '../../models/cart-item.model';
import {CartGlobalService} from '../../services/cart/cart-global.service';
import {MatButton} from '@angular/material/button';
import {Order} from '../../models/order.model';
import {OrderService} from '../../services/order.service';
import {Router} from '@angular/router';
import {CartCountService} from '../../services/cart/cart-count.service';

@Component({
  selector: 'app-checkout',
  imports: [
    BackButtonComponent,
    ShippingFormComponent,
    SummarizeOrderComponent,
    MatButton,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export default class CheckoutComponent implements OnInit {
  private _router = inject(Router);
  private _cartService = inject(CartService);
  private _orderService = inject(OrderService);
  private _cartGlobalService = inject(CartGlobalService);
  private _cartCountService = inject(CartCountService);

  cartItems = signal<CartItem[]>([]);
  order = signal<Order>({} as Order);

  ngOnInit() {
    this._cartService.getCartProducts().subscribe(products => {
      this.cartItems.set(products);
      this._cartGlobalService.setCartItems(products);
    })
  }

  onSubmit(event: any) {
    this.order.set(event);
  }

  placeOrder() {
    console.log(this.order());
    this._orderService.placeOrder(this.order()).subscribe(() => {
      this._cartGlobalService.setCartItems([]);
      this._cartCountService.setCount(0);
      this._router.navigate(['/order-success']);
    });
  }

}
