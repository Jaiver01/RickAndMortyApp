import { Mapper } from '../../../../base/mapper';
import { LocationModel } from '../../../../domain/models/location.model';
import { LocationEntity } from '../entities/location-entity';

export class LocationMapper extends Mapper<LocationEntity, LocationModel> {
  override mapFrom(param: LocationEntity): LocationModel {
    return {
      ...param,
    };
  }

  override mapTo(param: LocationModel): LocationEntity {
    throw new Error('Method not implemented.');
  }
}
