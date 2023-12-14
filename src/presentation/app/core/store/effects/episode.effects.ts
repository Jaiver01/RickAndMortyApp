import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { EMPTY, Observable } from 'rxjs';
import * as episodeActions from '../actions/episode.actions';
import * as filterActions from '../actions/filter.actions';
import { GetEpisodesUseCase } from '../../../../../domain/usecases/get-episodes.usecase';

@Injectable()
export class EpisodeEffects {
  loadEpisodes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(episodeActions.loadEpisodes),
      mergeMap(({ page = 1, filters = {} }) =>
        this.getEpisodesUseCase.execute({ page, filter: filters }).pipe(
          map((paginatedEpisodes) =>
            episodeActions.loadEpisodesSuccess({
              pagination: paginatedEpisodes,
            })
          ),
          catchError((error) => {
            episodeActions.loadEpisodesFailure({ error });

            return EMPTY;
          })
        )
      )
    )
  );

  filterEpisodes$ = createEffect(
    (): Observable<any> =>
      this.actions$.pipe(
        ofType(filterActions.setFilters),
        map((filters) => {
          this.store.dispatch(episodeActions.clearEpisodes());
          return episodeActions.loadEpisodes({
            page: 1,
            filters: filters.episodes,
          });
        })
      )
  );

  constructor(
    private actions$: Actions,
    private getEpisodesUseCase: GetEpisodesUseCase,
    private store: Store
  ) {}
}
