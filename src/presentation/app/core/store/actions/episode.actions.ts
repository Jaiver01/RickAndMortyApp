import { createAction, props } from '@ngrx/store';
import { PaginatedDataModel } from '../../../../../domain/models/paginated-data.model';
import {
  EpisodeFilter,
  ShortEpisodeModel,
} from '../../../../../domain/models/episode.model';

export const loadEpisodes = createAction(
  '[Episode] Load Episodes',
  props<{ page: number; filters?: EpisodeFilter }>()
);

export const loadEpisodesSuccess = createAction(
  '[Episode] Load Episodes Success',
  props<{ pagination: PaginatedDataModel<ShortEpisodeModel> }>()
);

export const loadEpisodesFailure = createAction(
  '[Episode] Load Episodes Failure',
  props<{ error: any }>()
);

export const clearEpisodes = createAction('[Episode] Clear Episodes List');
