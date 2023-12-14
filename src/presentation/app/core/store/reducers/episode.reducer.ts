import { createReducer, on } from '@ngrx/store';
import * as episodeActions from '../actions/episode.actions';
import { PaginatedDataModel } from '../../../../../domain/models/paginated-data.model';
import { ShortEpisodeModel } from '../../../../../domain/models/episode.model';

export interface EpisodeState {
  pagination: PaginatedDataModel<ShortEpisodeModel>;
  episodes: ShortEpisodeModel[];
  loading: boolean;
  error: any;
}

export const initialState: EpisodeState = {
  pagination: {
    info: {
      count: 0,
      pages: 0,
      next: 1,
      prev: null,
    },
  },
  episodes: [],
  loading: false,
  error: null,
};

export const episodeReducer = createReducer(
  initialState,
  on(episodeActions.loadEpisodes, (state) => ({ ...state, loading: true })),
  on(episodeActions.clearEpisodes, (_) => ({
    pagination: {
      info: {
        count: 0,
        pages: 0,
        next: 1,
        prev: null,
      },
    },
    episodes: [],
    loading: false,
    error: null,
  })),
  on(episodeActions.loadEpisodesSuccess, (state, { pagination }) => ({
    ...state,
    pagination,
    episodes: [...state.episodes, ...(pagination.data ?? [])],
    loading: false,
    error: null,
  })),
  on(episodeActions.loadEpisodesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
