import {inject, Injectable} from '@angular/core';
import {BaseService} from './base-service';
import {environment} from '../../environments/environment.local';
import {BehaviorSubject, catchError, Observable} from 'rxjs';
import {CartCountService} from './cart/cart-count.service';
import {WishlistCountService} from './wishlist-count.service';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  private _baseUrl = `${environment.authApiUrl}`;
  private _cartCountService = inject(CartCountService);
  private _wishlistCountService = inject(WishlistCountService);

  private authSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  readonly isAuthenticated$ = this.authSubject.asObservable();

  public login(email: string, password: string): Observable<string> {
    return this.httpClient.post<string>(`${this._baseUrl}/login`, { email, password })
      .pipe(catchError((err) => this.handleError(err)));
  }

  public logout(): void {
    localStorage.removeItem('user');
    this._cartCountService.setCount(0);
    this._wishlistCountService.setCount(0);
    this.emitAuthState();
  }

  public getToken(): LoginResponse | null {
    const user = localStorage.getItem('user');
    if (!user) {
      return null;
    }
    return JSON.parse(localStorage.getItem('user')!);
  }

  public isAuthenticated(): boolean {
    const user = this.getToken();
    if (!user) {
      return false;
    }

    const payload = JSON.parse(atob(user.token.split('.')[1]));
    return payload.exp * 1000 > Date.now();
  }

  public emitAuthState(): void {
    this.authSubject.next(this.isAuthenticated());
  }

}
