import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment.local';
import {catchError, Observable} from 'rxjs';
import {Product} from '../models/product.model';
import {BaseService} from './base-service';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends BaseService{

  private _baseUrl = `${environment.productsApiUrl}`;

  public getProducts(category: string = ''): Observable<Product[]> {
    if (category) {
      return this.httpClient.get<Product[]>(this._baseUrl, { params: { category } })
        .pipe(catchError(this.handleError));
    }

    return this.httpClient.get<Product[]>(this._baseUrl)
      .pipe(catchError(this.handleError));
  }

  public getProductById(productId: string): Observable<Product> {
    const url = `${this._baseUrl}/${productId}`;
    return this.httpClient.get<Product>(url)
      .pipe(catchError(this.handleError));
  }

}
