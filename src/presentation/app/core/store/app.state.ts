import { ActionReducerMap } from '@ngrx/store';
import { CharacterState, characterReducer } from './reducers/character.reducer';
import { CharacterEffects } from './effects/character.effects';

export interface AppState {
  characters: CharacterState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  characters: characterReducer,
};

export const ROOT_EFFECTS = [CharacterEffects];
