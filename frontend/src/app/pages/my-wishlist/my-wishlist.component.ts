import { Component } from '@angular/core';
import {BackButtonComponent} from '../../components/back-button/back-button.component';

@Component({
  selector: 'app-my-wishlist',
  imports: [
    BackButtonComponent
  ],
  templateUrl: './my-wishlist.component.html',
  styleUrl: './my-wishlist.component.scss',
})
export default class MyWishlistComponent {

}
