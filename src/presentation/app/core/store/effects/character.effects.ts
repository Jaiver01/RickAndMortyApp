import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import * as characterActions from './../actions/characters.actions';
import { GetCharactersUseCase } from '../../../../../domain/usecases/get-characters.usecase';

@Injectable()
export class CharacterEffects {
  loadCharacters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(characterActions.loadCharacters),
      mergeMap(({ page }) =>
        this.getCharactersUseCase.execute({ page }).pipe(
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

  constructor(
    private actions$: Actions,
    private getCharactersUseCase: GetCharactersUseCase
  ) {}
}
