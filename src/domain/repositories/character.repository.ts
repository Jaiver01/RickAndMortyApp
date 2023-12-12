import { Observable } from 'rxjs';
import {
  CharacterFilter,
  CharacterModel,
  ShortCharacterModel,
} from '../models/character.model';
import { PaginatedDataModel } from '../models/paginated-data.model';

export abstract class CharacterRepository {
  abstract getCharacters(
    page?: number,
    filter?: CharacterFilter
  ): Observable<PaginatedDataModel<ShortCharacterModel>>;

  abstract getCharacter(id: number): Observable<CharacterModel>;
}
