import { Mapper } from '../../../../base/mapper';
import {
  ShortCharacterModel,
  CharacterStatus,
} from '../../../../domain/models/character.model';
import { CharacterEntity } from '../entities/character-entity';

export class ShortCharacterMapper extends Mapper<
  CharacterEntity,
  ShortCharacterModel
> {
  override mapFrom(param: CharacterEntity): ShortCharacterModel {
    return {
      ...param,
      status: CharacterStatus[param.status],
    };
  }

  override mapTo(param: ShortCharacterModel): CharacterEntity {
    throw new Error('Method not implemented.');
  }
}
