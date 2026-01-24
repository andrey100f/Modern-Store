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

  qtyUpdated = output<'ADD' | 'REMOVE'>();

  increaseQty() {
    this.qtyUpdated.emit('ADD');
  }

  decreaseQty() {
    this.qtyUpdated.emit('REMOVE');
  }

}
