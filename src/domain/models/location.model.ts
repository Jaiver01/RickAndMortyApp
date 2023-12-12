import { ResourceBase } from './resource-base';

export interface LocationModel extends ResourceBase {
  type: string;
  dimension: string;
  residents: string[];
}

export interface ShortLocationModel {
  id: number;
  name: string;
  type: string;
}

export interface LocationFilter {
  name?: string;
  type?: string;
  dimension?: string;
}
