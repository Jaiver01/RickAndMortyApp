import { Observable } from 'rxjs';
import { PaginatedDataModel } from '../models/paginated-data.model';
import {
  EpisodeFilter,
  EpisodeModel,
  ShortEpisodeModel,
} from '../models/episode.model';

export abstract class EpisodeRepository {
  abstract getEpisodes(
    page?: number,
    filter?: EpisodeFilter
  ): Observable<PaginatedDataModel<ShortEpisodeModel>>;

  abstract getEpisode(id: number): Observable<EpisodeModel>;
}
