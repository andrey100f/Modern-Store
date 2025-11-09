import {Component, inject} from '@angular/core';
import {BackButtonComponent} from '../../components/back-button/back-button.component';
import {EcommerceStore} from '../../ecommerce-store';
import {ProductCardComponent} from '../../components/product-card/product-card.component';
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatIconButton} from '@angular/material/button';
import {EmptyWishlistComponent} from './empty-wishlist/empty-wishlist.component';

@Component({
  selector: 'app-my-wishlist',
  imports: [
    BackButtonComponent,
    ProductCardComponent,
    MatIcon,
    MatIconButton,
    MatButton,
    EmptyWishlistComponent
  ],
  templateUrl: './my-wishlist.component.html',
  styleUrl: './my-wishlist.component.scss',
})
export default class MyWishlistComponent {
  store = inject(EcommerceStore);
}
