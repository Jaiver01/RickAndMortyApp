import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EpisodeState } from '../reducers/episode.reducer';

export const selectEpisodeState =
  createFeatureSelector<EpisodeState>('episodes');

export const selectPagination = createSelector(
  selectEpisodeState,
  (state) => state.pagination
);

export const selectEpisodes = createSelector(
  selectEpisodeState,
  (state) => state.episodes
);

export const selectLoading = createSelector(
  selectEpisodeState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectEpisodeState,
  (state) => state.error
);
