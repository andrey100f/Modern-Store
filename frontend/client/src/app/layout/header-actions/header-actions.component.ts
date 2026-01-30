import {Component, inject} from '@angular/core';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {RouterLink} from '@angular/router';
import {MatBadge} from '@angular/material/badge';
import {EcommerceStore} from '../../ecommerce-store';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatDivider} from '@angular/material/divider';
import {MatDialog} from '@angular/material/dialog';
import {SignInDialogComponent} from '../../components/sign-in-dialog/sign-in-dialog.component';
import {SignUpDialogComponent} from '../../components/sign-up-dialog/sign-up-dialog.component';
import {WishlistCountService} from '../../services/wishlist-count.service';
import {CartCountService} from '../../services/cart/cart-count.service';
import {AuthService} from '../../services/auth.service';

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

  private _wishlistCountService = inject(WishlistCountService);
  private _cartCountService = inject(CartCountService);

  authService = inject(AuthService);
  store = inject(EcommerceStore);
  matDialog = inject(MatDialog);

  wishlistCount() {
    return this._wishlistCountService.getCount();
  }

  cartCount() {
    return this._cartCountService.getCount();
  }

  getUser() {
    return this.store.user();
  }

  signOut() {
    this.store.signOut();
  }

  openSignInDialog() {
    this.matDialog.open(SignInDialogComponent, {
      disableClose: true
    });
  }

  openSignUpDialog() {
    this.matDialog.open(SignUpDialogComponent, {
      disableClose: true
    });
  }

}
