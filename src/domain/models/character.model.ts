import { LocationModel } from './location.model';
import { ResourceBase } from './resource-base';

export enum CharacterStatus {
  Dead = 'Dead',
  Alive = 'Alive',
  unknown = 'unknown',
}

export enum CharacterGender {
  Female = 'Female',
  Male = 'Male',
  Genderless = 'Genderless',
  unknown = 'unknown',
}

export interface CharacterModel extends ResourceBase {
  status: CharacterStatus;
  species: string;
  type: string;
  gender: CharacterGender;
  origin: LocationModel;
  location: LocationModel;
  image: string;
  episode: string[];
}

export interface ShortCharacterModel {
  id: number;
  name: string;
  status: CharacterStatus;
  gender: CharacterGender;
  image: string;
}

export interface CharacterFilter {
  name?: string;
  type?: string;
  species?: string;
  status?: CharacterStatus;
  gender?: CharacterGender;
}
