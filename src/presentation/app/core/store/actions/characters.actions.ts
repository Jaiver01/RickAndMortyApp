import { createAction, props } from '@ngrx/store';
import { ShortCharacterModel } from '../../../../../domain/models/character.model';
import { PaginatedDataModel } from '../../../../../domain/models/paginated-data.model';

export const loadCharacters = createAction(
  '[Character] Load Characters',
  props<{ page: number }>()
);
export const loadCharactersSuccess = createAction(
  '[Character] Load Characters Success',
  props<{ pagination: PaginatedDataModel<ShortCharacterModel> }>()
);
export const loadCharactersFailure = createAction(
  '[Character] Load Characters Failure',
  props<{ error: any }>()
);
