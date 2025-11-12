import {Component, inject} from '@angular/core';
import {BackButtonComponent} from '../../components/back-button/back-button.component';
import {ShippingFormComponent} from './shipping-form/shipping-form.component';
import {SummarizeOrderComponent} from '../../components/summarize-order/summarize-order.component';
import {EcommerceStore} from '../../ecommerce-store';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-checkout',
  imports: [
    BackButtonComponent,
    ShippingFormComponent,
    SummarizeOrderComponent,
    MatButton
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export default class CheckoutComponent {
  store = inject(EcommerceStore);

  cartItems() {
    return this.store.cartItems();
  }

  isLoading() {
    return this.store.loading();
  }

  placeOrder() {
    this.store.placeOrder();
  }

}
