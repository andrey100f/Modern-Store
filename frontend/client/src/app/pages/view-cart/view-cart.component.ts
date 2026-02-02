import {Component, inject} from '@angular/core';
import {BackButtonComponent} from '../../components/back-button/back-button.component';
import {ListCartItemsComponent} from './list-cart-items/list-cart-items.component';
import {TeaseWishlistComponent} from './tease-wishlist/tease-wishlist.component';
import {SummarizeOrderComponent} from '../../components/summarize-order/summarize-order.component';
import {MatButton} from '@angular/material/button';
import {AuthService} from '../../services/auth.service';
import {SignInDialogComponent} from '../../components/sign-in-dialog/sign-in-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';

@Component({
  selector: 'app-view-cart',
  imports: [
    BackButtonComponent,
    ListCartItemsComponent,
    TeaseWishlistComponent,
    SummarizeOrderComponent,
    MatButton
  ],
  templateUrl: './view-cart.component.html',
  styleUrl: './view-cart.component.scss',
})
export default class ViewCartComponent {
  private _authService = inject(AuthService);
  private _matDialog = inject(MatDialog);
  private _router = inject(Router);

  onProceedToCheckout() {
    if (!this._authService.isAuthenticated()) {
      this._matDialog.open(SignInDialogComponent, {
        disableClose: true,
        data: {
          checkout: true
        }
      });
      return;
    }

    this._router.navigate(['/checkout']);
  }
}
