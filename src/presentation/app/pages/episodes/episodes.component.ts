import { Component, OnInit } from '@angular/core';
import { GetEpisodesUseCase } from '../../../../domain/usecases/get-episodes.usecase';
import { PaginatedDataModel } from '../../../../domain/models/paginated-data.model';
import { ShortEpisodeModel } from '../../../../domain/models/episode.model';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FiltersSectionComponent } from '../../shared/components/filters-section/filters-section.component';

@Component({
  selector: 'app-episodes',
  standalone: true,
  imports: [InfiniteScrollModule, FiltersSectionComponent],
  templateUrl: './episodes.component.html',
  styleUrl: './episodes.component.scss',
})
export class EpisodesComponent implements OnInit {
  pagination: PaginatedDataModel<ShortEpisodeModel> = {
    info: {
      count: 0,
      pages: 0,
      next: 1,
      prev: null,
    },
  };

  episodes: ShortEpisodeModel[] = [];
  seasons: { title: string; episodes: ShortEpisodeModel[] }[] = [];
  isLoading: boolean = false;

  constructor(private getEpisodesUseCase: GetEpisodesUseCase) {}

  ngOnInit(): void {
    this.getEpisodes(1);
  }

  onScrollDown(): void {
    if (this.isLoading || !this.pagination.info?.next) {
      return;
    }

    this.getEpisodes(this.pagination.info.next);
  }

  getEpisodes(page: number): void {
    this.isLoading = true;

    this.getEpisodesUseCase.execute({ page }).subscribe({
      next: (paginatedEpisodes) => {
        if (paginatedEpisodes.data?.length) {
          this.pagination = paginatedEpisodes;
          this.episodes.push(...paginatedEpisodes.data);
          this.parseEpisodes(this.episodes);
        }

        this.isLoading = false;
      },
      error: (err) => {
        // TODO: handle error
        console.error('Error: ' + err.message);
      },
    });
  }

  parseEpisodes(episodes: ShortEpisodeModel[]): void {
    this.seasons = episodes.reduce(function (
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
