import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartRefreshService {
  private readonly _refresh$ = new Subject<void>();

  readonly refresh$ = this._refresh$.asObservable();

  trigger(): void {
    this._refresh$.next();
  }
}
