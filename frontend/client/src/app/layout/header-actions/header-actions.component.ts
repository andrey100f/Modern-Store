import {Component, inject} from '@angular/core';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {Router, RouterLink} from '@angular/router';
import {MatBadge} from '@angular/material/badge';
import {MatDialog} from '@angular/material/dialog';
import {SignInDialogComponent} from '../../components/sign-in-dialog/sign-in-dialog.component';
import {SignUpDialogComponent} from '../../components/sign-up-dialog/sign-up-dialog.component';
import {WishlistCountService} from '../../services/wishlist-count.service';
import {CartCountService} from '../../services/cart/cart-count.service';
import {AuthService} from '../../services/auth.service';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-header-actions',
  imports: [
    MatButton,
    MatIconButton,
    MatIcon,
    RouterLink,
    MatBadge,
    AsyncPipe
  ],
  templateUrl: './header-actions.component.html',
  styleUrl: './header-actions.component.scss',
})
export class HeaderActionsComponent {
  private _router = inject(Router);
  private _wishlistCountService = inject(WishlistCountService);
  private _cartCountService = inject(CartCountService);

  authService = inject(AuthService);
  matDialog = inject(MatDialog);

  wishlistCount() {
    return this._wishlistCountService.getCount();
  }

  cartCount() {
    return this._cartCountService.getCount();
  }

  signOut() {
    this.authService.logout();

    if (this._router.url.includes("/checkout")) {
      this._router.navigate(['/']);
    }
  }

  openSignInDialog() {
    const ref = this.matDialog.open(SignInDialogComponent);

    ref.afterClosed().subscribe(() => {
      this.authService.emitAuthState();
    });
  }

  openSignUpDialog() {
    this.matDialog.open(SignUpDialogComponent, {
      disableClose: true
    });
  }

}
