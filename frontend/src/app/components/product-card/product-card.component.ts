import {Component, input} from '@angular/core';
import {Product} from '../../models/product.model';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-product-card',
  imports: [
    MatButton,
    MatIcon
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {

  product = input.required<Product>();

}
