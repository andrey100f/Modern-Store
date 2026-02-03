import {Component, inject, OnInit, output, signal} from '@angular/core';
import {ViewPanelDirective} from '../../../directives/view-panel.directive';
import {MatIcon} from '@angular/material/icon';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormBuilder, FormGroup, NonNullableFormBuilder, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-shipping-form',
  imports: [
    ViewPanelDirective,
    MatIcon,
    MatFormField,
    MatInput,
    ReactiveFormsModule
  ],
  templateUrl: './shipping-form.component.html',
  styleUrl: './shipping-form.component.scss',
})
export class ShippingFormComponent implements OnInit {
  form!: FormGroup;
  formBuilder = inject(NonNullableFormBuilder);
  formSubmit = output();

  ngOnInit() {
    this.form = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      address: [''],
      city: [''],
      state: [''],
      zip: [''],
    });

    this.form.valueChanges.subscribe(() => {
      this._emitForm();
    });

    this._emitForm();
  }

  private _emitForm() {
    this.formSubmit.emit(this.form.value);
  }

}
