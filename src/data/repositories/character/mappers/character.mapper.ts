import { Mapper } from '../../../../base/mapper';
import {
  CharacterGender,
  CharacterModel,
  CharacterStatus,
} from '../../../../domain/models/character.model';
import { CharacterEntity } from '../entities/character-entity';

export class CharacterMapper extends Mapper<CharacterEntity, CharacterModel> {
  override mapFrom(param: CharacterEntity): CharacterModel {
    return {
      ...param,
      status: CharacterStatus[param.status],
      gender: CharacterGender[param.gender],
    };
  }

  override mapTo(param: CharacterModel): CharacterEntity {
    throw new Error('Method not implemented.');
  }
}
