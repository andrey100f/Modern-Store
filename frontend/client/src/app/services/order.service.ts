import {Injectable} from '@angular/core';
import {BaseService} from './base-service';
import {catchError, Observable} from 'rxjs';
import {environment} from '../../environments/environment.nginx';
import {Order} from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseService {
  private _baseUrl = `${environment.ordersApiUrl}`;

  public placeOrder(order: Partial<Order>): Observable<void> {
    return this.httpClient.post<void>(`${this._baseUrl}`, order)
      .pipe(catchError((err) => this.handleError(err)));
  }
}
