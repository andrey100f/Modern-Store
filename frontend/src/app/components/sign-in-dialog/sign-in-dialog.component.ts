import {Component, inject, signal} from '@angular/core';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatDialogClose} from '@angular/material/dialog';
import {MatIcon} from '@angular/material/icon';
import {NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField, MatPrefix, MatSuffix} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-sign-in-dialog',
  imports: [
    MatIconButton,
    MatDialogClose,
    MatIcon,
    MatFormField,
    MatInput,
    MatSuffix,
    ReactiveFormsModule,
    MatPrefix,
    MatButton
  ],
  templateUrl: './sign-in-dialog.component.html',
  styleUrl: './sign-in-dialog.component.scss',
})
export class SignInDialogComponent {

  fb = inject(NonNullableFormBuilder);

  signInForm = this.fb.group({
    email: ['johnd@test.com', Validators.required],
    password: ['test123', Validators.required]
  });

  passwordVisible = signal<boolean>(false);

  onPasswordVisible() {
    this.passwordVisible.set(!this.passwordVisible());
  }

  signIn() {}

}
