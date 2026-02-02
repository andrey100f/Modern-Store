import {inject, Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {catchError, throwError} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private _authService = inject(AuthService);

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const user = this._authService.getToken();

    if (user && !req.url.includes('/api/products/')) {
      req = req.clone({ setHeaders: { Authorization: `Bearer ${user.token}` }});
    }

    return next.handle(req).pipe(
      catchError(err => {
        return throwError(() => err);
      })
    );
  }
}
