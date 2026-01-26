import {Component} from '@angular/core';
import {ViewPanelDirective} from '../../../directives/view-panel.directive';
import {MatIcon} from '@angular/material/icon';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-shipping-form',
  imports: [
    ViewPanelDirective,
    MatIcon,
    MatFormField,
    MatInput
  ],
  templateUrl: './shipping-form.component.html',
  styleUrl: './shipping-form.component.scss',
})
export class ShippingFormComponent {}
