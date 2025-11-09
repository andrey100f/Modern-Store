import {Component} from '@angular/core';
import {BackButtonComponent} from '../../components/back-button/back-button.component';
import {ListCartItemsComponent} from './list-cart-items/list-cart-items.component';

@Component({
  selector: 'app-view-cart',
  imports: [
    BackButtonComponent,
    ListCartItemsComponent
  ],
  templateUrl: './view-cart.component.html',
  styleUrl: './view-cart.component.scss',
})
export default class ViewCartComponent {

}
