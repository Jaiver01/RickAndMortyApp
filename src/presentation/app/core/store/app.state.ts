import { ActionReducerMap } from '@ngrx/store';
import { CharacterState, characterReducer } from './reducers/character.reducer';
import { CharacterEffects } from './effects/character.effects';
import { FilterState, filterReducer } from './reducers/filter.reducer';
import { LocationState, locationReducer } from './reducers/location.reducer';
import { LocationEffects } from './effects/location.effects';
import { EpisodeState, episodeReducer } from './reducers/episode.reducer';
import { EpisodeEffects } from './effects/episode.effects';

export interface AppState {
  characters: CharacterState;
  locations: LocationState;
  episodes: EpisodeState;
  filter: FilterState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  characters: characterReducer,
  locations: locationReducer,
  episodes: episodeReducer,
  filter: filterReducer,
};

export const ROOT_EFFECTS = [CharacterEffects, LocationEffects, EpisodeEffects];
