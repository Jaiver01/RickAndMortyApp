import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FilterState } from '../reducers/filter.reducer';

export const selectFilterState = createFeatureSelector<FilterState>('filter');

export const selectCurrentPage = createSelector(
  selectFilterState,
  (state) => state.page
);

export const selectFilters = createSelector(
  selectFilterState,
  (state) => state.filters
);
