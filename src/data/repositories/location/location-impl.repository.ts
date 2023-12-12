import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { PaginatedDataModel } from '../../../domain/models/paginated-data.model';
import { Apollo } from 'apollo-angular';
import {
  PaginatedDataEntity,
  QueryResponseEntity,
} from '../../entities/query-response-entity';
import { LocationRepository } from '../../../domain/repositories/location.repository';
import {
  LocationFilter,
  LocationModel,
  ShortLocationModel,
} from '../../../domain/models/location.model';
import { LocationMapper } from './mappers/location.mapper';
import { ShortLocationMapper } from './mappers/short-location.mapper';
import { GET_LOCATIONS } from './queries/get-locations.query';
import { LocationEntity } from './entities/location-entity';
import { GET_LOCATION } from './queries/get-location.query';

@Injectable({
  providedIn: 'root',
})
export class LocationImplRepository extends LocationRepository {
  private locationMapper = new LocationMapper();
  private shortLocationMapper = new ShortLocationMapper();

  constructor(private apollo: Apollo) {
    super();
  }

  override getLocations(
    page?: number,
    filter?: LocationFilter
  ): Observable<PaginatedDataModel<ShortLocationModel>> {
    const options = {
      query: GET_LOCATIONS,
      variables: { page: page ?? 1, filter: filter ?? {} },
    };

    return this.apollo
      .query<QueryResponseEntity<PaginatedDataEntity<LocationEntity>>>(options)
      .pipe(
        map((result) => ({
          info: result.data['locations'].info,
          data: result.data['locations'].results.map(
            this.shortLocationMapper.mapFrom
          ),
        }))
      );
  }

  override getLocation(id: number): Observable<LocationModel> {
    const options = {
      query: GET_LOCATION,
      variables: { id },
    };

    return this.apollo
      .query<QueryResponseEntity<LocationEntity>>(options)
      .pipe(
        map((result) => this.locationMapper.mapFrom(result.data['location']))
      );
  }
}
