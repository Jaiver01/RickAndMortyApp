import { ResourceBase } from './resource-base';

export enum CharacterStatus {
  Dead = 'Muerto',
  Alive = 'Vivo',
  unknown = 'Desconocido',
}

export enum CharacterGender {
  Female = 'Femenino',
  Male = 'Masculino',
  Genderless = 'Sin género',
  unknown = 'Desconocido',
}

export interface CharacterModel extends ResourceBase {
  status: CharacterStatus;
  species: string;
  type: string;
  gender: CharacterGender;
  origin: CharacterLocation;
  location: CharacterLocation;
  image: string;
  episode: string[];
}

export interface ShortCharacterModel {
  id: number;
  name: string;
  status: CharacterStatus;
  image: string;
}

interface CharacterLocation {
  name: string;
  url: string;
}

export interface CharacterFilter {
  name?: string;
  type?: string;
  species?: string;
  status?: CharacterStatus;
  gender?: CharacterGender;
}
