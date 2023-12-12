import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card-option',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './card-option.component.html',
  styleUrl: './card-option.component.scss',
})
export class CardOptionComponent {
  @Input() title: string = '';
  @Input() image: string = '';
  @Input({ required: true }) href: string = '';
}
