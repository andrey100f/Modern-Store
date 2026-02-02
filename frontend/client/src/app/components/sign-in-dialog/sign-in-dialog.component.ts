import {Component, inject, signal} from '@angular/core';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialog, MatDialogClose, MatDialogRef} from '@angular/material/dialog';
import {MatIcon} from '@angular/material/icon';
import {NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField, MatPrefix, MatSuffix} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {SignUpDialogComponent} from '../sign-up-dialog/sign-up-dialog.component';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

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
  private _authService = inject(AuthService);
  private _router = inject(Router);

  fb = inject(NonNullableFormBuilder);
  data = inject<{ checkout: boolean }>(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef);
  matDialog = inject(MatDialog);

  signInForm = this.fb.group({
    email: ['johnd@test.com', Validators.required],
    password: ['test123', Validators.required]
  });

  passwordVisible = signal<boolean>(false);

  onPasswordVisible() {
    this.passwordVisible.set(!this.passwordVisible());
  }

  signIn() {
    if (!this.signInForm.valid) {
      this.signInForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.signInForm.value;
    this._authService.login(email!, password!).subscribe({
      next: (data) => {
        localStorage.setItem('user', JSON.stringify(data));
        this.dialogRef.close();
      }
    });

    if (this.data?.checkout) {
      this._router.navigate(['/checkout']);
    }
  }

  openSignUpDialog() {
    this.dialogRef.close();
    this.matDialog.open(SignUpDialogComponent, {
      disableClose: true,
      data: {
        checkout: this.data?.checkout
      }
    })
  }

}
