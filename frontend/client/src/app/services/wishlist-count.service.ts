import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WishlistCountService {
  public count = signal<number>(0);

  setCount(newCount: number): void {
    this.count.set(newCount);
  }

  getCount(): number {
    return this.count();
  }

}
