import {CartItem} from './cart-item.model';

export type Order = {
  id: string;
  userId: string;
  total: number;
  items: CartItem[];
  paymentStatus: 'success' | 'failure';
}
