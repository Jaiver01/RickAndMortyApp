import { createAction, props } from '@ngrx/store';
import { CharacterFilter } from '../../../../../domain/models/character.model';
import { EpisodeFilter } from '../../../../../domain/models/episode.model';
import { LocationFilter } from '../../../../../domain/models/location.model';

export const setCurrentPage = createAction(
  '[Filter] Set Current Page',
  props<{
    page: 'characters' | 'episodes' | 'locations' | 'home';
  }>()
);

export const setFilters = createAction(
  '[Filter] Set Filters',
  props<{
    characters?: CharacterFilter;
    episodes?: EpisodeFilter;
    locations?: LocationFilter;
  }>()
);
