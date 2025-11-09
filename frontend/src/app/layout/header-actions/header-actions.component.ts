import {Component, inject} from '@angular/core';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {RouterLink} from '@angular/router';
import {MatBadge} from '@angular/material/badge';
import {EcommerceStore} from '../../ecommerce-store';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatDivider} from '@angular/material/divider';

@Component({
  selector: 'app-header-actions',
  imports: [
    MatButton,
    MatIconButton,
    MatIcon,
    RouterLink,
    MatBadge,
    MatMenuTrigger,
    MatMenu,
    MatDivider,
    MatMenuItem
  ],
  templateUrl: './header-actions.component.html',
  styleUrl: './header-actions.component.scss',
})
export class HeaderActionsComponent {

  store = inject(EcommerceStore);

  wishlistCount() {
    return this.store.wishlistCount();
  }

  cartCount() {
    return this.store.cartCount();
  }

  getUser() {
    return this.store.user();
  }

  signOut() {
    this.store.signOut();
  }

}
