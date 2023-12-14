import { createReducer, on } from '@ngrx/store';
import * as locationActions from '../actions/location.actions';
import { PaginatedDataModel } from '../../../../../domain/models/paginated-data.model';
import { ShortLocationModel } from '../../../../../domain/models/location.model';

export interface LocationState {
  pagination: PaginatedDataModel<ShortLocationModel>;
  locations: ShortLocationModel[];
  loading: boolean;
  error: any;
}

export const initialState: LocationState = {
  pagination: {
    info: {
      count: 0,
      pages: 0,
      next: 1,
      prev: null,
    },
  },
  locations: [],
  loading: false,
  error: null,
};

export const locationReducer = createReducer(
  initialState,
  on(locationActions.loadLocations, (state) => ({ ...state, loading: true })),
  on(locationActions.clearLocations, (_) => ({
    pagination: {
      info: {
        count: 0,
        pages: 0,
        next: 1,
        prev: null,
      },
    },
    locations: [],
    loading: false,
    error: null,
  })),
  on(locationActions.loadLocationsSuccess, (state, { pagination }) => ({
    ...state,
    pagination,
    locations: [...state.locations, ...(pagination.data ?? [])],
    loading: false,
    error: null,
  })),
  on(locationActions.loadLocationsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
