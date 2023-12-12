import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { PaginatedDataModel } from '../../../domain/models/paginated-data.model';
import { Apollo } from 'apollo-angular';
import {
  PaginatedDataEntity,
  QueryResponseEntity,
} from '../../entities/query-response-entity';
import { EpisodeRepository } from '../../../domain/repositories/episode.repository';
import { EpisodeMapper } from './mappers/episode.mapper';
import { ShortEpisodeMapper } from './mappers/short-episode.mapper';
import { EpisodeEntity } from './entities/episode-entity';
import {
  EpisodeFilter,
  EpisodeModel,
  ShortEpisodeModel,
} from '../../../domain/models/episode.model';
import { GET_EPISODES } from './queries/get-episodes.query';
import { GET_EPISODE } from './queries/get-episode.query';

@Injectable({
  providedIn: 'root',
})
export class EpisodeImplRepository extends EpisodeRepository {
  private episodeMapper = new EpisodeMapper();
  private shortEpisodeMapper = new ShortEpisodeMapper();

  constructor(private apollo: Apollo) {
    super();
  }

  override getEpisodes(
    page?: number,
    filter?: EpisodeFilter
  ): Observable<PaginatedDataModel<ShortEpisodeModel>> {
    const options = {
      query: GET_EPISODES,
      variables: { page: page ?? 1, filter: filter ?? {} },
    };

    return this.apollo
      .query<QueryResponseEntity<PaginatedDataEntity<EpisodeEntity>>>(options)
      .pipe(
        map((result) => ({
          info: result.data['episodes'].info,
          data: result.data['episodes'].results.map(
            this.shortEpisodeMapper.mapFrom
          ),
        }))
      );
  }

  override getEpisode(id: number): Observable<EpisodeModel> {
    const options = {
      query: GET_EPISODE,
      variables: { id },
    };

    return this.apollo
      .query<QueryResponseEntity<EpisodeEntity>>(options)
      .pipe(
        map((result) => this.episodeMapper.mapFrom(result.data['episode']))
      );
  }
}
