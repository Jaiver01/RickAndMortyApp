import { Observable } from 'rxjs';
import { UseCase } from '../base/use-case';
import { PaginatedDataModel } from '../models/paginated-data.model';
import { LocationRepository } from '../repositories/location.repository';
import { LocationFilter, ShortLocationModel } from '../models/location.model';

export class GetLocationsUseCase
  implements
    UseCase<
      {
        page?: number;
        filter?: LocationFilter;
      },
      PaginatedDataModel<ShortLocationModel>
    >
{
  constructor(private locationRepository: LocationRepository) {}

  execute(params: {
    page?: number;
    filter?: LocationFilter;
  }): Observable<PaginatedDataModel<ShortLocationModel>> {
    return this.locationRepository.getLocations(params.page, params.filter);
  }
}
