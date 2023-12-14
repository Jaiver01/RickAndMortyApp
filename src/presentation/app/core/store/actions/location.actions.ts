import { createAction, props } from '@ngrx/store';
import { PaginatedDataModel } from '../../../../../domain/models/paginated-data.model';
import {
  LocationFilter,
  ShortLocationModel,
} from '../../../../../domain/models/location.model';

export const loadLocations = createAction(
  '[Location] Load Locations',
  props<{ page: number; filters?: LocationFilter }>()
);

export const loadLocationsSuccess = createAction(
  '[Location] Load Locations Success',
  props<{ pagination: PaginatedDataModel<ShortLocationModel> }>()
);

export const loadLocationsFailure = createAction(
  '[Location] Load Locations Failure',
  props<{ error: any }>()
);

export const clearLocations = createAction('[Location] Clear Locations List');
