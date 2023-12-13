import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatedDataModel } from '../../../../domain/models/paginated-data.model';
import { ShortCharacterModel } from '../../../../domain/models/character.model';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FiltersSectionComponent } from '../../shared/components/filters-section/filters-section.component';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectLoading,
  selectPagination,
} from '../../core/store/selectors/character.selectors';
import { loadCharacters } from '../../core/store/actions/characters.actions';
import { CharacterListComponent } from './components/character-list/character-list.component';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [
    CommonModule,
    InfiniteScrollModule,
    CharacterListComponent,
    FiltersSectionComponent,
  ],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss',
})
export class CharactersComponent implements OnInit {
  isLoading$: Observable<boolean>;

  private pagination: PaginatedDataModel<ShortCharacterModel> = {};
  private paginationSubscription: Subscription;

  constructor(private store: Store) {
    this.isLoading$ = this.store.select(selectLoading);

    this.paginationSubscription = this.store
      .select(selectPagination)
      .subscribe({
        next: (pagination) => (this.pagination = pagination),
      });
  }

  ngOnInit(): void {
    this.getCharacters(this.pagination.info?.next ?? 1);
  }

  ngOnDestroy(): void {
    this.paginationSubscription.unsubscribe();
  }

  onScrollDown(): void {
    if (!this.pagination.info?.next) {
      return;
    }

    this.getCharacters(this.pagination.info.next);
  }

  getCharacters(page: number): void {
    this.store.dispatch(loadCharacters({ page }));
  }
}
