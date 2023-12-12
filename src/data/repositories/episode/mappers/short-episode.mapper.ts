import { Mapper } from '../../../../base/mapper';
import { ShortEpisodeModel } from '../../../../domain/models/episode.model';
import { EpisodeEntity } from '../entities/episode-entity';

export class ShortEpisodeMapper extends Mapper<
  EpisodeEntity,
  ShortEpisodeModel
> {
  override mapFrom(param: EpisodeEntity): ShortEpisodeModel {
    return {
      ...param,
    };
  }

  override mapTo(param: ShortEpisodeModel): EpisodeEntity {
    throw new Error('Method not implemented.');
  }
}
