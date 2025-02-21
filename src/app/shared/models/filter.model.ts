export type Status = 'alive' | 'dead' | 'unknown';
export type Gender = 'male' | 'female' | 'genderless' | 'unknown';
export type Species = string;
export type EpisodeName = string;
export type LocationName = string;
export type Dimension = string;
export type Type = string;

export type Nullable<T> = T | null;

export type CharactersFilters = {
  value: Nullable<Status | Gender | Species>;
};
