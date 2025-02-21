import { Episode } from './episode.model';

export interface TodoList {
  id?: string;
  ownerId: string;
  listName: string;
  selectedEpisodes?: TodoList.SelectedEpisode[];
}

export namespace TodoList {
  export class SelectedEpisode {
    uid?: string;
    checked?: boolean;
    constructor(
      public id: string,
      public episode: string,
      public name: string,
    ) {}
  }
}
