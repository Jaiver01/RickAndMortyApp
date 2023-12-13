import { ActionReducerMap } from '@ngrx/store';
import { CharacterState, characterReducer } from './reducers/character.reducer';
import { CharacterEffects } from './effects/character.effects';
import { FilterState, filterReducer } from './reducers/filter.reducer';

export interface AppState {
  characters: CharacterState;
  filter: FilterState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  characters: characterReducer,
  filter: filterReducer,
};

export const ROOT_EFFECTS = [CharacterEffects];
