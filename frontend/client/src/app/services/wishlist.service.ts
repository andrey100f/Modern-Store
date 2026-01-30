import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment.local';
import {catchError, Observable} from 'rxjs';
import {Product} from '../models/product.model';
import {BaseService} from './base-service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService extends BaseService {

  private _baseUrl = `${environment.usersApiUrl}`;

  public getWishlistProducts(userId: string = 'e6e134d7-3976-4484-aabe-71b42e8d543d'): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this._baseUrl}/${userId}/wishlist`)
      .pipe(catchError((err) => this.handleError(err)));
  }

  public addProductToWishlist(productId: string, userId: string = 'e6e134d7-3976-4484-aabe-71b42e8d543d'): Observable<void> {
    return this.httpClient.post<void>(`${this._baseUrl}/${userId}/wishlist/${productId}`, null)
      .pipe(catchError((err) => this.handleError(err)));
  }

  public removeProductFromWishlist(productId: string, userId: string = 'e6e134d7-3976-4484-aabe-71b42e8d543d'): Observable<void> {
    return this.httpClient.delete<void>(`${this._baseUrl}/${userId}/wishlist/${productId}`)
      .pipe(catchError((err) => this.handleError(err)));
  }

  public clearWishlist(userId: string = 'e6e134d7-3976-4484-aabe-71b42e8d543d'): Observable<void> {
    return this.httpClient.delete<void>(`${this._baseUrl}/${userId}/wishlist/clear`)
      .pipe(catchError((err) => this.handleError(err)));
  }

  public moveProductsToCart(products: Product[], userId: string = 'e6e134d7-3976-4484-aabe-71b42e8d543d'): Observable<void> {
    return this.httpClient.put<void>(`${this._baseUrl}/${userId}/wishlist/move-to-cart`, products)
      .pipe(catchError((err) => this.handleError(err)));
  }

}
