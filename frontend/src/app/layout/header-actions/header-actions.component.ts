import { Component } from '@angular/core';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-header-actions',
  imports: [
    MatButton,
    MatIconButton,
    MatIcon,
    RouterLink
  ],
  templateUrl: './header-actions.component.html',
  styleUrl: './header-actions.component.scss',
})
export class HeaderActionsComponent {

}
