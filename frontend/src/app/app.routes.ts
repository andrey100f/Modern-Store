import { Routes } from '@angular/router';
import {cartResolver} from './resolvers/products-grid.resolver';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'products'
  },
  {
    path: 'products',
    loadComponent: () => import('./pages/products-grid/products-grid.component'),
    resolve: {
      _: cartResolver
    },
  },
  {
    path: 'product/:productId',
    loadComponent: () => import('./pages/product-view-detail/product-view-detail.component'),
  },
  {
    path: 'wishlist',
    loadComponent: () => import('./pages/my-wishlist/my-wishlist.component'),
  },
  {
    path: 'cart',
    loadComponent: () => import('./pages/view-cart/view-cart.component'),
  },
  {
    path: 'checkout',
    loadComponent: () => import('./pages/checkout/checkout.component'),
  },
  {
    path: 'order-success',
    loadComponent: () => import('./pages/order-success/order-success.component'),
  }
];
