import { LocationEntity } from '../../location/entities/location-entity';

export interface CharacterEntity {
  id: number;
  name: string;
  status: 'Dead' | 'Alive' | 'unknown';
  species: string;
  type: string;
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
  origin: LocationEntity;
  location: LocationEntity;
  image: string;
  episode: string[];
  url: string;
  created: string;
}
