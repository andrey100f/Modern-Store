import {Injectable} from '@angular/core';
import {BaseService} from './base-service';
import {environment} from '../../environments/environment.local';
import {catchError, Observable} from 'rxjs';
import {CartItem} from '../models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService extends BaseService {
  private _baseUrl = `${environment.usersApiUrl}`;

  public getCartProducts(userId: string = 'e6e134d7-3976-4484-aabe-71b42e8d543d'): Observable<CartItem[]> {
    return this.httpClient.get<CartItem[]>(`${this._baseUrl}/${userId}/cart`)
      .pipe(catchError(this.handleError));
  }

  public addProductToCart(productId: string, userId: string = 'e6e134d7-3976-4484-aabe-71b42e8d543d'): Observable<void> {
    return this.httpClient.post<void>(`${this._baseUrl}/${userId}/cart/${productId}`, null)
      .pipe(catchError(this.handleError));
  }

  public removeProductFromCart(productId: string, userId: string = 'e6e134d7-3976-4484-aabe-71b42e8d543d'): Observable<void> {
    return this.httpClient.delete<void>(`${this._baseUrl}/${userId}/cart/${productId}`)
      .pipe(catchError(this.handleError));
  }

  public addNewProductToCart(productId: string, userId: string = 'e6e134d7-3976-4484-aabe-71b42e8d543d'): Observable<void> {
    return this.httpClient.post<void>(`${this._baseUrl}/${userId}/cart/${productId}/add`, null)
      .pipe(catchError(this.handleError));
  }

  public clearProductFromCart(productId: string, userId: string = 'e6e134d7-3976-4484-aabe-71b42e8d543d'): Observable<void> {
    return this.httpClient.delete<void>(`${this._baseUrl}/${userId}/cart/${productId}/clear`)
      .pipe(catchError(this.handleError));
  }

  public moveProductFromCartToWishlist(productId: string, userId: string = 'e6e134d7-3976-4484-aabe-71b42e8d543d'): Observable<void> {
    return this.httpClient.put<void>(`${this._baseUrl}/${userId}/cart/${productId}/move-to-wishlist`, null)
      .pipe(catchError(this.handleError));
  }

  //
  // public clearCart(userId: string = 'e6e134d7-3976-4484-aabe-71b42e8d543d'): Observable<void> {
  //   return this.httpClient.delete<void>(`${this._baseUrl}/${userId}`)
  //     .pipe(catchError(this.handleError));
  // }
}
