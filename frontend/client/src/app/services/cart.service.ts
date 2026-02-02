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

  public getCartProducts(): Observable<CartItem[]> {
    return this.httpClient.get<CartItem[]>(`${this._baseUrl}/cart`)
      .pipe(catchError((err) => this.handleError(err)));
  }

  public addProductToCart(productId: string): Observable<void> {
    return this.httpClient.post<void>(`${this._baseUrl}/cart/${productId}`, null)
      .pipe(catchError((err) => this.handleError(err)));
  }

  public removeProductFromCart(productId: string): Observable<void> {
    return this.httpClient.delete<void>(`${this._baseUrl}/cart/${productId}`)
      .pipe(catchError((err) => this.handleError(err)));
  }

  public addNewProductToCart(productId: string): Observable<void> {
    return this.httpClient.post<void>(`${this._baseUrl}/cart/${productId}/add`, null)
      .pipe(catchError((err) => this.handleError(err)));
  }

  public clearProductFromCart(productId: string): Observable<void> {
    return this.httpClient.delete<void>(`${this._baseUrl}/cart/${productId}/clear`)
      .pipe(catchError((err) => this.handleError(err)));
  }

  public moveProductFromCartToWishlist(productId: string): Observable<void> {
    return this.httpClient.put<void>(`${this._baseUrl}/cart/${productId}/move-to-wishlist`, null)
      .pipe(catchError((err) => this.handleError(err)));
  }

  //
  // public clearCart(userId: string = 'e6e134d7-3976-4484-aabe-71b42e8d543d'): Observable<void> {
  //   return this.httpClient.delete<void>(`${this._baseUrl}/${userId}`)
  //     .pipe(catchError(this.handleError));
  // }
}
