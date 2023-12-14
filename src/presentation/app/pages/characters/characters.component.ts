import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatedDataModel } from '../../../../domain/models/paginated-data.model';
import {
  CharacterFilter,
  ShortCharacterModel,
} from '../../../../domain/models/character.model';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FiltersSectionComponent } from '../../shared/components/filters-section/filters-section.component';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectLoading,
  selectPagination,
} from '../../core/store/selectors/character.selectors';
import { loadCharacters } from '../../core/store/actions/character.actions';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { setCurrentPage } from '../../core/store/actions/filter.actions';
import { selectFilters } from '../../core/store/selectors/filter.selectors';

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
  private filters: CharacterFilter = {};
  private filtersSubscription: Subscription;

  constructor(private store: Store) {
    this.store.dispatch(setCurrentPage({ page: 'characters' }));

    this.isLoading$ = this.store.select(selectLoading);

    this.paginationSubscription = this.store
      .select(selectPagination)
      .subscribe({
        next: (pagination) => (this.pagination = pagination),
      });

    this.filtersSubscription = this.store.select(selectFilters).subscribe({
      next: (filters) => (this.filters = filters.characters),
    });
  }

  ngOnInit(): void {
    if (!this.pagination.info?.next || this.pagination.info?.next === 1) {
      this.getCharacters(1);
    }
  }

  ngOnDestroy(): void {
    this.paginationSubscription.unsubscribe();
    this.filtersSubscription.unsubscribe();
  }

  onScrollDown(): void {
    if (!this.pagination.info?.next) {
      return;
    }

    this.getCharacters(this.pagination.info.next);
  }

  getCharacters(page: number): void {
    this.store.dispatch(loadCharacters({ page, filters: this.filters }));
  }
}
