import { Component } from '@angular/core';
import { CardOptionComponent } from './componets/card-option/card-option.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardOptionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
