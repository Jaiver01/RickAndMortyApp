import { Observable } from 'rxjs';
import { PaginatedDataModel } from '../models/paginated-data.model';
import {
  LocationFilter,
  LocationModel,
  ShortLocationModel,
} from '../models/location.model';

export abstract class LocationRepository {
  abstract getLocations(
    page?: number,
    filter?: LocationFilter
  ): Observable<PaginatedDataModel<ShortLocationModel>>;

  abstract getLocation(id: number): Observable<LocationModel>;
}
