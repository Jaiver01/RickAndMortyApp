import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { EMPTY, Observable } from 'rxjs';
import * as locationActions from '../actions/location.actions';
import * as filterActions from '../actions/filter.actions';
import { GetLocationsUseCase } from '../../../../../domain/usecases/get-locations.usecase';

@Injectable()
export class LocationEffects {
  loadLocations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(locationActions.loadLocations),
      mergeMap(({ page = 1, filters = {} }) =>
        this.getLocationsUseCase.execute({ page, filter: filters }).pipe(
          map((paginatedLocations) =>
            locationActions.loadLocationsSuccess({
              pagination: paginatedLocations,
            })
          ),
          catchError((error) => {
            locationActions.loadLocationsFailure({ error });

            return EMPTY;
          })
        )
      )
    )
  );

  filterLocations$ = createEffect(
    (): Observable<any> =>
      this.actions$.pipe(
        ofType(filterActions.setFilters),
        map((filters) => {
          this.store.dispatch(locationActions.clearLocations());
          return locationActions.loadLocations({
            page: 1,
            filters: filters.locations,
          });
        })
      )
  );

  constructor(
    private actions$: Actions,
    private getLocationsUseCase: GetLocationsUseCase,
    private store: Store
  ) {}
}
