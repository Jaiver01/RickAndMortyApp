import { Observable } from 'rxjs';
import { UseCase } from '../base/use-case';
import { CharacterModel } from '../models/character.model';
import { CharacterRepository } from '../repositories/character.repository';

export class GetCharacterUseCase
  implements UseCase<{ id: number }, CharacterModel>
{
  constructor(private characterRepository: CharacterRepository) {}

  execute(params: { id: number }): Observable<CharacterModel> {
    return this.characterRepository.getCharacter(params.id);
  }
}
