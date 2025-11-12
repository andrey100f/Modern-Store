import { Component } from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-order-success',
  imports: [
    MatIcon,
    MatButton,
    RouterLink
  ],
  templateUrl: './order-success.component.html',
  styleUrl: './order-success.component.scss',
})
export default class OrderSuccessComponent {

}
