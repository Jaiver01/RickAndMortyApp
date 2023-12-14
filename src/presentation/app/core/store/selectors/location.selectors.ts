import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LocationState } from '../reducers/location.reducer';

export const selectLocationState =
  createFeatureSelector<LocationState>('locations');

export const selectPagination = createSelector(
  selectLocationState,
  (state) => state.pagination
);

export const selectLocations = createSelector(
  selectLocationState,
  (state) => state.locations
);

export const selectLoading = createSelector(
  selectLocationState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectLocationState,
  (state) => state.error
);
