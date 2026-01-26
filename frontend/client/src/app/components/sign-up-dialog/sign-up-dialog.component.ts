import {Component, inject} from '@angular/core';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialog, MatDialogClose, MatDialogRef} from '@angular/material/dialog';
import {MatIcon} from '@angular/material/icon';
import {NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {EcommerceStore} from '../../ecommerce-store';
import {SignUpParams} from '../../models/user.model';
import {MatFormField, MatPrefix} from '@angular/material/form-field';
import {SignInDialogComponent} from '../sign-in-dialog/sign-in-dialog.component';

@Component({
  selector: 'app-sign-up-dialog',
  imports: [
    MatIconButton,
    MatDialogClose,
    MatIcon,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatPrefix,
    MatButton
  ],
  templateUrl: './sign-up-dialog.component.html',
  styleUrl: './sign-up-dialog.component.scss',
})
export class SignUpDialogComponent {
  fb = inject(NonNullableFormBuilder);
  store = inject(EcommerceStore);
  dialogRef = inject(MatDialogRef);
  data = inject<{ checkout: boolean }>(MAT_DIALOG_DATA);
  matDialog = inject(MatDialog);

  signUpForm = this.fb.group({
    name: ['John D', Validators.required],
    email: ['johnd@test.com', Validators.required],
    password: ['test123', Validators.required],
    confirmPassword: ['test123', Validators.required]
  });

  signUp() {
    if (!this.signUpForm.valid) {
      return;
    }

    const { name, email, password } = this.signUpForm.value;
    this.store.signUp({ name, email, password } as SignUpParams, this.data?.checkout, this.dialogRef.id);
  }

  openSignInDialog() {
    this.dialogRef.close();
    this.matDialog.open(SignInDialogComponent, {
      disableClose: true,
      data: {
        checkout: this.data?.checkout
      }
    });
  }
}
