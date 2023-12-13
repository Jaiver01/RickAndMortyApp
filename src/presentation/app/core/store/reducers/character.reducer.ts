import { createReducer, on } from '@ngrx/store';
import * as characterActions from '../actions/character.actions';
import { PaginatedDataModel } from '../../../../../domain/models/paginated-data.model';
import { ShortCharacterModel } from '../../../../../domain/models/character.model';

export interface CharacterState {
  pagination: PaginatedDataModel<ShortCharacterModel>;
  characters: ShortCharacterModel[];
  loading: boolean;
  error: any;
}

export const initialState: CharacterState = {
  pagination: {
    info: {
      count: 0,
      pages: 0,
      next: 1,
      prev: null,
    },
  },
  characters: [],
  loading: false,
  error: null,
};

export const characterReducer = createReducer(
  initialState,
  on(characterActions.loadCharacters, (state) => ({ ...state, loading: true })),
  on(characterActions.clearCharacters, (_) => ({
    pagination: {
      info: {
        count: 0,
        pages: 0,
        next: 1,
        prev: null,
      },
    },
    characters: [],
    loading: false,
    error: null,
  })),
  on(characterActions.loadCharactersSuccess, (state, { pagination }) => ({
    ...state,
    pagination,
    characters: [...state.characters, ...(pagination.data ?? [])],
    loading: false,
    error: null,
  })),
  on(characterActions.loadCharactersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
