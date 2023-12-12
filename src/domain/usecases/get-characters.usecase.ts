import { Observable } from 'rxjs';
import { UseCase } from '../base/use-case';
import { PaginatedDataModel } from '../models/paginated-data.model';
import {
  CharacterFilter,
  ShortCharacterModel,
} from '../models/character.model';
import { CharacterRepository } from '../repositories/character.repository';

export class GetCharactersUseCase
  implements
    UseCase<
      {
        page?: number;
        filter?: CharacterFilter;
      },
      PaginatedDataModel<ShortCharacterModel>
    >
{
  constructor(private characterRepository: CharacterRepository) {}

  execute(params: {
    page?: number;
    filter?: CharacterFilter;
  }): Observable<PaginatedDataModel<ShortCharacterModel>> {
    return this.characterRepository.getCharacters(params.page, params.filter);
  }
}
