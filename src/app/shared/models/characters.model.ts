export interface Character {
  id: number;
  name: string;
  gender: string;
  status: string;
  species: string;
  type: string;
  location: { name: string };
  image: string;
  url: string;
}

export interface ApiResponse {
  info: any;
  results: Character[];
}
