import { Component } from '@angular/core';
import { CardOptionComponent } from './componets/card-option/card-option.component';
import { Store } from '@ngrx/store';
import { setCurrentPage } from '../../core/store/actions/filter.actions';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardOptionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private store: Store) {
    this.store.dispatch(setCurrentPage({ page: 'home' }));
  }
}
