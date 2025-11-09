import { Component } from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {HeaderActionsComponent} from '../header-actions/header-actions.component';

@Component({
  selector: 'app-header',
  imports: [MatToolbar, HeaderActionsComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

}
