import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap, of } from 'rxjs';
import { API_URL } from '../../shared/constants/api';
import { ApiResponse } from '../../shared/models/episode.model';
import { EpisodeName } from '../../shared/models/filter.model';
import { Character } from '../../shared/models/characters.model';
import { Episode } from '../../shared/models/episode.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog/dialog.component';
import { v4 as uuidv4 } from 'uuid';
import { WatchListService } from './watchList.service';

@Injectable({
  providedIn: 'root',
})
export class EpisodesService {
  private watchListService!: WatchListService;

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private injector: Injector
  ) {}

  private getWatchListService(): WatchListService {
    if (!this.watchListService) {
      this.watchListService = this.injector.get(WatchListService);
    }
    return this.watchListService;
  }

  getEpisodes(page: number, pageSize: number): Observable<ApiResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<ApiResponse>(`${API_URL}episode`, { params });
  }

  getEpisodesByFilters(
    page: number,
    pageSize: number,
    name?: EpisodeName
  ): Observable<ApiResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    if (name) {
      params = params.set('name', name);
    }

    return this.http.get<ApiResponse>(`${API_URL}episode`, { params });
  }

  getCharacterByUrl(url: string): Observable<Character> {
    const cachedData = localStorage.getItem(url);
    if (cachedData) {
      return of(JSON.parse(cachedData));
    }
    return this.http.get<Character>(url).pipe(
      tap((character) => {
        localStorage.setItem(url, JSON.stringify(character));
      })
    );
  }

  openDialog(episode: Episode): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { todoLists: this.getWatchListService().watchLists$, episode },
    });

    dialogRef.afterClosed().subscribe((selectedList) => {
      if (selectedList) {
        this.getWatchListService().addEpisodeToList(selectedList.id, {
          episode: episode.episode,
          id: uuidv4(),
          name: episode.name,
        });
      }
    });
  }
}
