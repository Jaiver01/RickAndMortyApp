import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { FiltersItemsComponent } from '../filters-items/filters-items.component';
import * as characterSelectors from '../../../core/store/selectors/character.selectors';
import * as episodeSelectors from '../../../core/store/selectors/episode.selectors';
import * as locationSelectors from '../../../core/store/selectors/location.selectors';
import { selectCurrentPage } from '../../../core/store/selectors/filter.selectors';
import { PaginatedDataModel } from '../../../../../domain/models/paginated-data.model';

@Component({
  selector: 'app-filters-section',
  standalone: true,
  imports: [CommonModule, FiltersItemsComponent],
  templateUrl: './filters-section.component.html',
  styleUrl: './filters-section.component.scss',
})
export class FiltersSectionComponent implements OnInit, OnDestroy {
  items$?: Observable<any[]>;
  pagination$?: Observable<PaginatedDataModel<any>>;

  currentPage: string = '';
  private currentPageSubscription: Subscription;

  constructor(private store: Store) {
    this.currentPageSubscription = this.store
      .select(selectCurrentPage)
      .subscribe({
        next: (currentPage) => (this.currentPage = currentPage),
      });
  }

  ngOnInit(): void {
    switch (this.currentPage) {
      case 'characters':
        this.items$ = this.store.select(characterSelectors.selectCharacters);
        this.pagination$ = this.store.select(
          characterSelectors.selectPagination
        );
        break;

      case 'locations':
        this.items$ = this.store.select(locationSelectors.selectLocations);
        this.pagination$ = this.store.select(
          locationSelectors.selectPagination
        );
        break;

      case 'episodes':
        this.items$ = this.store.select(episodeSelectors.selectEpisodes);
        this.pagination$ = this.store.select(episodeSelectors.selectPagination);
        break;

      default:
        break;
    }
  }

  ngOnDestroy(): void {
    this.currentPageSubscription.unsubscribe();
  }
}
