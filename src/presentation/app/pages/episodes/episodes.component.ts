import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { Observable, Subscription, map } from 'rxjs';
import { PaginatedDataModel } from '../../../../domain/models/paginated-data.model';
import {
  EpisodeFilter,
  ShortEpisodeModel,
} from '../../../../domain/models/episode.model';
import { FiltersSectionComponent } from '../../shared/components/filters-section/filters-section.component';
import { setCurrentPage } from '../../core/store/actions/filter.actions';
import {
  selectEpisodes,
  selectLoading,
  selectPagination,
} from '../../core/store/selectors/episode.selectors';
import { selectFilters } from '../../core/store/selectors/filter.selectors';
import { loadEpisodes } from '../../core/store/actions/episode.actions';

@Component({
  selector: 'app-episodes',
  standalone: true,
  imports: [CommonModule, InfiniteScrollModule, FiltersSectionComponent],
  templateUrl: './episodes.component.html',
  styleUrl: './episodes.component.scss',
})
export class EpisodesComponent implements OnInit {
  isLoading$: Observable<boolean>;
  seasons$: Observable<{ title: string; episodes: ShortEpisodeModel[] }[]>;

  private pagination: PaginatedDataModel<ShortEpisodeModel> = {};
  private paginationSubscription: Subscription;
  private filters: EpisodeFilter = {};
  private filtersSubscription: Subscription;

  constructor(private store: Store) {
    this.store.dispatch(setCurrentPage({ page: 'episodes' }));

    this.isLoading$ = this.store.select(selectLoading);
    this.seasons$ = this.store.select(selectEpisodes).pipe(
      map((episodes) => {
        return this.parseEpisodes(episodes);
      })
    );

    this.paginationSubscription = this.store
      .select(selectPagination)
      .subscribe({
        next: (pagination) => (this.pagination = pagination),
      });

    this.filtersSubscription = this.store.select(selectFilters).subscribe({
      next: (filters) => (this.filters = filters.episodes),
    });
  }

  ngOnInit(): void {
    if (this.pagination.info?.next === 1) {
      this.getEpisodes(1);
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

    this.getEpisodes(this.pagination.info.next);
  }

  getEpisodes(page: number): void {
    this.store.dispatch(loadEpisodes({ page, filters: this.filters }));
  }

  parseEpisodes(episodes: ShortEpisodeModel[]) {
    return episodes.reduce(function (
      acc: { title: string; episodes: ShortEpisodeModel[] }[],
      episode
    ) {
      const season = episode.episode.split('E')[0];

      const seasonIndex = acc.findIndex(
        (s: { title: string }) => s.title === season
      );

      if (seasonIndex === -1) {
        acc.push({ title: season, episodes: [episode] });
      } else {
        acc[seasonIndex].episodes.push(episode);
      }

      return acc;
    },
    []);
  }
}
