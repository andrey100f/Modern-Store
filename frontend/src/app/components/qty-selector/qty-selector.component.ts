import {Component, input, output} from '@angular/core';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-qty-selector',
  imports: [
    MatIconButton,
    MatIcon
  ],
  templateUrl: './qty-selector.component.html',
  styleUrl: './qty-selector.component.scss',
})
export class QtySelectorComponent {

  quantity = input<number>(0);

  qtyUpdated = output<number>();

  increaseQty() {
    const newQty = this.quantity() + 1;
    this.qtyUpdated.emit(newQty);
  }

  decreaseQty() {
    const newQty = this.quantity() - 1;
    this.qtyUpdated.emit(newQty);
  }

}
