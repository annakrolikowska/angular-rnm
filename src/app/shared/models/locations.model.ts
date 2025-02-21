import { Character } from './characters.model';

export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: Character[];
  url: string;
  created: string;
}

export interface ApiResponse {
  info: any;
  results: Location[];
}
