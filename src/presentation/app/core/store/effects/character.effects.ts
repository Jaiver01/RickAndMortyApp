import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { EMPTY, Observable } from 'rxjs';
import * as characterActions from '../actions/character.actions';
import * as filterActions from '../actions/filter.actions';
import { GetCharactersUseCase } from '../../../../../domain/usecases/get-characters.usecase';

@Injectable()
export class CharacterEffects {
  loadCharacters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(characterActions.loadCharacters),
      mergeMap(({ page = 1, filters = {} }) =>
        this.getCharactersUseCase.execute({ page, filter: filters }).pipe(
          map((paginatedCharacters) =>
            characterActions.loadCharactersSuccess({
              pagination: paginatedCharacters,
            })
          ),
          catchError((error) => {
            characterActions.loadCharactersFailure({ error });

            return EMPTY;
          })
        )
      )
    )
  );

  filterCharacters$ = createEffect(
    (): Observable<any> =>
      this.actions$.pipe(
        ofType(filterActions.setFilters),
        map((filters) => {
          this.store.dispatch(characterActions.clearCharacters());
          return characterActions.loadCharacters({
            page: 1,
            filters: filters.characters,
          });
        })
      )
  );

  constructor(
    private actions$: Actions,
    private getCharactersUseCase: GetCharactersUseCase,
    private store: Store
  ) {}
}
