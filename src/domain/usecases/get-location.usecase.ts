import { Observable } from 'rxjs';
import { UseCase } from '../base/use-case';
import { LocationModel } from '../models/location.model';
import { LocationRepository } from '../repositories/location.repository';

export class GetLocationUseCase
  implements UseCase<{ id: number }, LocationModel>
{
  constructor(private locationRepository: LocationRepository) {}

  execute(params: { id: number }): Observable<LocationModel> {
    return this.locationRepository.getLocation(params.id);
  }
}
