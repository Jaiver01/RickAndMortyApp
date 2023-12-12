import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CharacterMapper } from './mappers/character.mapper';
import {
  CharacterFilter,
  ShortCharacterModel,
  CharacterModel,
} from '../../../domain/models/character.model';
import { PaginatedDataModel } from '../../../domain/models/paginated-data.model';
import { Apollo } from 'apollo-angular';
import { CharacterEntity } from './entities/character-entity';
import { GET_CHARACTERS } from './queries/get-characters.query';
import { GET_CHARACTER } from './queries/get-character.query';
import {
  PaginatedDataEntity,
  QueryResponseEntity,
} from '../../entities/query-response-entity';
import { CharacterRepository } from '../../../domain/repositories/character.repository';
import { ShortCharacterMapper } from './mappers/short-character.mapper';

@Injectable({
  providedIn: 'root',
})
export class CharacterImplRepository extends CharacterRepository {
  private characterMapper = new CharacterMapper();
  private shortCharacterMapper = new ShortCharacterMapper();

  constructor(private apollo: Apollo) {
    super();
  }

  override getCharacters(
    page?: number,
    filter?: CharacterFilter
  ): Observable<PaginatedDataModel<ShortCharacterModel>> {
    const options = {
      query: GET_CHARACTERS,
      variables: { page: page ?? 1, filter: filter ?? {} },
    };

    return this.apollo
      .query<QueryResponseEntity<PaginatedDataEntity<CharacterEntity>>>(options)
      .pipe(
        map((result) => ({
          info: result.data['characters'].info,
          data: result.data['characters'].results.map(
            this.shortCharacterMapper.mapFrom
          ),
        }))
      );
  }

  override getCharacter(id: number): Observable<CharacterModel> {
    const options = {
      query: GET_CHARACTER,
      variables: { id },
    };

    return this.apollo
      .query<QueryResponseEntity<CharacterEntity>>(options)
      .pipe(
        map((result) => this.characterMapper.mapFrom(result.data['character']))
      );
  }
}
