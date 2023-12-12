import { Observable } from 'rxjs';
import { UseCase } from '../base/use-case';
import { EpisodeFilter, ShortEpisodeModel } from '../models/episode.model';
import { PaginatedDataModel } from '../models/paginated-data.model';
import { EpisodeRepository } from '../repositories/episode.repository';

export class GetEpisodesUseCase
  implements
    UseCase<
      {
        page?: number;
        filter?: EpisodeFilter;
      },
      PaginatedDataModel<ShortEpisodeModel>
    >
{
  constructor(private episodeRepository: EpisodeRepository) {}

  execute(params: {
    page?: number;
    filter?: EpisodeFilter;
  }): Observable<PaginatedDataModel<ShortEpisodeModel>> {
    return this.episodeRepository.getEpisodes(params.page, params.filter);
  }
}
