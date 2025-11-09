import { Component } from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-empty-wishlist',
  imports: [
    MatButton,
    MatIcon,
    RouterLink
  ],
  templateUrl: './empty-wishlist.component.html',
  styleUrl: './empty-wishlist.component.scss',
})
export class EmptyWishlistComponent {

}
