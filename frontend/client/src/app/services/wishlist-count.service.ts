import {inject, Injectable, signal} from '@angular/core';
import {WishlistService} from './wishlist.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistCountService {
  private _wishlistService = inject(WishlistService);
  public count = signal<number>(0);

  setCount(newCount: number): void {
    this.count.set(newCount);
  }

  getCount(): number {
    return this.count();
  }

  refreshCount(): void {
    this._wishlistService.getWishlistProducts().subscribe(wishlistItems => {
      this.setCount(wishlistItems.length);
    });
  }

}
