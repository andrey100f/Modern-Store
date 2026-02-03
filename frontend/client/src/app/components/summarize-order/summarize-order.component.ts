import {Component, computed, inject} from '@angular/core';
import {ViewPanelDirective} from '../../directives/view-panel.directive';
import {CartGlobalService} from '../../services/cart/cart-global.service';

@Component({
  selector: 'app-summarize-order',
  imports: [
    ViewPanelDirective
  ],
  templateUrl: './summarize-order.component.html',
  styleUrl: './summarize-order.component.scss',
})
export class SummarizeOrderComponent {

  private _cartGlobalService = inject(CartGlobalService);

  subtotal = computed(() =>
    Math.round(this._cartGlobalService.getCartItems().reduce((acc, item) => acc + (item.product.price * item.quantity), 0)));

  tax = computed(() => Math.round(0.05 * this.subtotal()));

  total = computed(() => Math.round(this.subtotal() + this.tax()));

}
