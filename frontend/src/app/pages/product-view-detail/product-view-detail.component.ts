import {Component, computed, inject, input, OnInit} from '@angular/core';
import {EcommerceStore} from '../../ecommerce-store';
import {Product} from '../../models/product.model';
import {BackButtonComponent} from '../../components/back-button/back-button.component';
import {ProductInfoComponent} from './product-info/product-info.component';

@Component({
  selector: 'app-product-view-detail',
  imports: [
    BackButtonComponent,
    ProductInfoComponent
  ],
  templateUrl: './product-view-detail.component.html',
  styleUrl: './product-view-detail.component.scss',
})
export default class ProductViewDetailComponent implements OnInit {
  productId = input.required<string>();
  store = inject(EcommerceStore);

  backRoute = computed(() => `/products/${this.currentCategory()}`);

  ngOnInit() {
    this.store.setProductId(this.productId);
  }

  getProduct(): Product | undefined {
    return this.store.selectedProduct();
  }

  currentCategory() {
    return this.store.category();
  }
}
