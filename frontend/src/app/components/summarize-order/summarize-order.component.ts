import {Component, computed, inject} from '@angular/core';
import {ViewPanelDirective} from '../../directives/view-panel.directive';
import {EcommerceStore} from '../../ecommerce-store';

@Component({
  selector: 'app-summarize-order',
  imports: [
    ViewPanelDirective
  ],
  templateUrl: './summarize-order.component.html',
  styleUrl: './summarize-order.component.scss',
})
export class SummarizeOrderComponent {

  store = inject(EcommerceStore);

  subtotal = computed(() =>
    Math.round(this.store.cartItems().reduce((acc, item) => acc + (item.product.price * item.quantity), 0)));

  tax = computed(() => Math.round(0.05 * this.subtotal()));

  total = computed(() => Math.round(this.subtotal() - this.tax()));

}
