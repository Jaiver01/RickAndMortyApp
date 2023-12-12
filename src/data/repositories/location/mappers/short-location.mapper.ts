import { Mapper } from '../../../../base/mapper';
import { ShortLocationModel } from '../../../../domain/models/location.model';
import { LocationEntity } from '../entities/location-entity';

export class ShortLocationMapper extends Mapper<
  LocationEntity,
  ShortLocationModel
> {
  override mapFrom(param: LocationEntity): ShortLocationModel {
    return {
      ...param,
    };
  }

  override mapTo(param: ShortLocationModel): LocationEntity {
    throw new Error('Method not implemented.');
  }
}
