import { Mapper } from '../../../../base/mapper';
import { EpisodeModel } from '../../../../domain/models/episode.model';
import { EpisodeEntity } from '../entities/episode-entity';

export class EpisodeMapper extends Mapper<EpisodeEntity, EpisodeModel> {
  override mapFrom(param: EpisodeEntity): EpisodeModel {
    return {
      ...param,
      airDate: param.air_date,
    };
  }

  override mapTo(param: EpisodeModel): EpisodeEntity {
    throw new Error('Method not implemented.');
  }
}
