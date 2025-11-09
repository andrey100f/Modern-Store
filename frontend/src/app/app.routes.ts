import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'products/all'
  },
  {
    path: 'products/:category',
    loadComponent: () => import('./pages/products-grid/products-grid.component'),
  },
  {
    path: 'wishlist',
    loadComponent: () => import('./pages/my-wishlist/my-wishlist.component'),
  },
  {
    path: 'cart',
    loadComponent: () => import('./pages/view-cart/view-cart.component'),
  }
];
