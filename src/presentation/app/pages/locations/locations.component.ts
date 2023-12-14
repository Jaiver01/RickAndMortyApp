import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {
  LocationFilter,
  ShortLocationModel,
} from '../../../../domain/models/location.model';
import { PaginatedDataModel } from '../../../../domain/models/paginated-data.model';
import { FiltersSectionComponent } from '../../shared/components/filters-section/filters-section.component';
import { setCurrentPage } from '../../core/store/actions/filter.actions';
import {
  selectLoading,
  selectLocations,
  selectPagination,
} from '../../core/store/selectors/location.selectors';
import { selectFilters } from '../../core/store/selectors/filter.selectors';
import { loadLocations } from '../../core/store/actions/location.actions';

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    InfiniteScrollModule,
    FiltersSectionComponent,
  ],
  templateUrl: './locations.component.html',
  styleUrl: './locations.component.scss',
})
export class LocationsComponent implements OnInit {
  isLoading$: Observable<boolean>;
  locations$: Observable<ShortLocationModel[]>;

  private pagination: PaginatedDataModel<ShortLocationModel> = {};
  private paginationSubscription: Subscription;
  private filters: LocationFilter = {};
  private filtersSubscription: Subscription;

  constructor(private store: Store) {
    this.store.dispatch(setCurrentPage({ page: 'locations' }));

    this.isLoading$ = this.store.select(selectLoading);
    this.locations$ = this.store.select(selectLocations);

    this.paginationSubscription = this.store
      .select(selectPagination)
      .subscribe({
        next: (pagination) => (this.pagination = pagination),
      });

    this.filtersSubscription = this.store.select(selectFilters).subscribe({
      next: (filters) => (this.filters = filters.locations),
    });
  }

  ngOnInit(): void {
    if (this.pagination.info?.next === 1) {
      this.getLocations(1);
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

    this.getLocations(this.pagination.info.next);
  }

  getLocations(page: number): void {
    this.store.dispatch(loadLocations({ page, filters: this.filters }));
  }
}
