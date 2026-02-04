import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment.nginx';
import {catchError, Observable} from 'rxjs';
import {Product} from '../models/product.model';
import {BaseService} from './base-service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService extends BaseService {

  private _baseUrl = `${environment.usersApiUrl}`;

  public getWishlistProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this._baseUrl}/wishlist`)
      .pipe(catchError((err) => this.handleError(err)));
  }

  public addProductToWishlist(productId: string): Observable<void> {
    return this.httpClient.post<void>(`${this._baseUrl}/wishlist/${productId}`, null)
      .pipe(catchError((err) => this.handleError(err)));
  }

  public removeProductFromWishlist(productId: string): Observable<void> {
    return this.httpClient.delete<void>(`${this._baseUrl}/wishlist/${productId}`)
      .pipe(catchError((err) => this.handleError(err)));
  }

  public clearWishlist(): Observable<void> {
    return this.httpClient.delete<void>(`${this._baseUrl}/wishlist/clear`)
      .pipe(catchError((err) => this.handleError(err)));
  }

  public moveProductsToCart(products: Product[]): Observable<void> {
    return this.httpClient.put<void>(`${this._baseUrl}/wishlist/move-to-cart`, products)
      .pipe(catchError((err) => this.handleError(err)));
  }

}
