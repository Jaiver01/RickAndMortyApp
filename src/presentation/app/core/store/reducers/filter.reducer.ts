import { createReducer, on } from '@ngrx/store';
import * as filterActions from '../actions/filter.actions';
import { CharacterFilter } from '../../../../../domain/models/character.model';
import { EpisodeFilter } from '../../../../../domain/models/episode.model';
import { LocationFilter } from '../../../../../domain/models/location.model';

export interface Filters {
  characters: CharacterFilter;
  episodes: EpisodeFilter;
  locations: LocationFilter;
}

export interface FilterState {
  page: 'characters' | 'episodes' | 'locations' | 'home';
  filters: Filters;
}

export const initialState: FilterState = {
  page: 'home',
  filters: {
    characters: {},
    episodes: {},
    locations: {},
  },
};

export const filterReducer = createReducer(
  initialState,
  on(filterActions.setCurrentPage, (state, { page }) => ({ ...state, page })),
  on(filterActions.setFilters, (state, filters) => ({
    ...state,
    filters: {
      characters: { ...state.filters.characters, ...filters.characters },
      episodes: { ...state.filters.episodes, ...filters.episodes },
      locations: { ...state.filters.locations, ...filters.locations },
    },
  }))
);
