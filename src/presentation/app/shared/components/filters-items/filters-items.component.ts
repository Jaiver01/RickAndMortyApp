import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  CharacterFilter,
  CharacterGender,
  CharacterStatus,
} from '../../../../../domain/models/character.model';
import {
  selectCurrentPage,
  selectFilters,
} from '../../../core/store/selectors/filter.selectors';
import { setFilters } from '../../../core/store/actions/filter.actions';
import { EpisodeFilter } from '../../../../../domain/models/episode.model';
import { LocationFilter } from '../../../../../domain/models/location.model';

type Filters = 'characters' | 'episodes' | 'locations';

interface FilterItem {
  title: string;
  field: string;
  options: string[];
  selected: string;
}

interface FilterPages {
  characters: FilterItem[];
  episodes: FilterItem[];
  locations: FilterItem[];
}

@Component({
  selector: 'app-filters-items',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filters-items.component.html',
  styleUrl: './filters-items.component.scss',
})
export class FiltersItemsComponent {
  index = Math.random();

  filtersContentPage: FilterItem[] = [];
  private currentPage: string = '';
  private currentPageSubscription: Subscription;
  private filters: {
    characters?: CharacterFilter;
    episodes?: EpisodeFilter;
    locations?: LocationFilter;
  } = {};
  private filtersSubscription: Subscription;

  private filtersContent: FilterPages = {
    characters: [
      {
        title: 'Status',
        field: 'status',
        options: Object.values(CharacterStatus),
        selected: '',
      },
      {
        title: 'Gender',
        field: 'gender',
        options: Object.values(CharacterGender),
        selected: '',
      },
    ],
    locations: [
      {
        title: 'Type',
        field: 'type',
        options: [
          'Planet',
          'Cluster',
          'Space station',
          'Microverse',
          'TV',
          'Dimension',
          'Memory',
          'Resort',
          'Dream',
          'unknown',
        ],
        selected: '',
      },
    ],
    episodes: [
      {
        title: 'Season',
        field: 'episode',
        options: ['S01', 'S02', 'S03', 'S04', 'S05'],
        selected: '',
      },
    ],
  };

  constructor(private store: Store) {
    this.currentPageSubscription = this.store
      .select(selectCurrentPage)
      .subscribe({
        next: (currentPage) => (this.currentPage = currentPage),
      });

    this.filtersSubscription = this.store.select(selectFilters).subscribe({
      next: (filters) => {
        this.filters = filters;
        this.parseFilters();
      },
    });
  }

  ngOnDestroy(): void {
    this.currentPageSubscription.unsubscribe();
    this.filtersSubscription.unsubscribe();
  }

  parseFilters() {
    const filters = this.filters[this.currentPage as Filters];

    this.filtersContentPage = this.filtersContent[
      this.currentPage as Filters
    ].map((filter) => ({
      ...filter,
      selected: (filters as any)?.[filter.field] ?? '',
    }));
  }

  onSelectFilter(filter: any, option: string) {
    filter.selected = option;

    this.store.dispatch(
      setFilters({
        ...this.filters,
        [this.currentPage]: {
          ...(this.filters[this.currentPage as Filters] ?? {}),
          [filter.field]: option,
        },
      })
    );
  }

  clearFilters(): void {
    this.filters = {
      ...this.filters,
      [this.currentPage]: {},
    };

    this.store.dispatch(setFilters(this.filters));
  }
}
