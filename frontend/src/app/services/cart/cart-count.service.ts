import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartCountService {
  private _count = signal<number>(0);

  setCount(newCount: number): void {
    this._count.set(newCount);
  }

  getCount(): number {
    return this._count();
  }
}
