import { ResourceBase } from './resource-base';

export interface EpisodeModel extends ResourceBase {
  airDate: string;
  episode: string;
  characters: string[];
}

export interface ShortEpisodeModel {
  id: number;
  name: string;
  episode: string;
}

export interface EpisodeFilter {
  name?: string;
  episode?: string;
}
