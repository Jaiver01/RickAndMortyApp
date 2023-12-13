import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CharacterState } from '../reducers/character.reducer';

export const selectCharacterState =
  createFeatureSelector<CharacterState>('characters');

export const selectPagination = createSelector(
  selectCharacterState,
  (state) => state.pagination
);

export const selectCharacters = createSelector(
  selectCharacterState,
  (state) => state.characters
);

export const selectLoading = createSelector(
  selectCharacterState,
  (state) => state.loading
);
export const selectError = createSelector(
  selectCharacterState,
  (state) => state.error
);
