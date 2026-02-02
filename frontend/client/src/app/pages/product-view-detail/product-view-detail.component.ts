import {Component, inject, input, OnInit, signal} from '@angular/core';
import {Product} from '../../models/product.model';
import {BackButtonComponent} from '../../components/back-button/back-button.component';
import {ProductInfoComponent} from './product-info/product-info.component';
import {ProductService} from '../../services/product.service';

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
  private _productService = inject(ProductService);

  protected product = signal<Product | undefined>(undefined);
  protected productId = input.required<string>();

  ngOnInit() {
    this._loadProduct();
  }

  private _loadProduct() {
    this._productService.getProductById(this.productId()).subscribe(product => {
      this.product.set(product);
    });
  }

}
