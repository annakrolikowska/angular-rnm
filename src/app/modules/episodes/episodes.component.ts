import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Episode } from '../../shared/models/episode.model';
import { EpisodesService } from '../../core/services/episodes.service';
import { Observable, tap, map, forkJoin } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { PAGE_SIZE } from '../../shared/constants/pageSize';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Character } from '../../shared/models/characters.model';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrl: './episodes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EpisodesComponent implements OnInit {
  episodes$: Observable<Episode[]>;
  characters$: Observable<Character[]>;
  page: number = 1;
  pageSize: number = PAGE_SIZE;
  totalEpisodes: number = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = [
    'id',
    'name',
    'air_date',
    'episode',
    'characters',
  ];

  constructor(
    private episodesService: EpisodesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.page = params.page || 1;
      this.getEpisodes(params);
    });
  }

  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.router.navigate([], {
      queryParams: { page: this.page },
      queryParamsHandling: 'merge',
    });

    this.getEpisodes();
  }

  openDialog(episode: Episode): void {
    this.episodesService.openDialog(episode);
  }

  private getEpisodes(params?: Params): void {
    this.episodes$ = this.episodesService
      .getEpisodesByFilters(this.page, this.pageSize, params?.name)
      .pipe(
        tap((response) => {
          this.totalEpisodes = response.info.count;
        }),
        map((response) => response.results),
        map((response) =>
          response.map((episode) => ({
            ...episode,
            characters$: this.fetchCharacterAvatar(episode.characters),
          })),
        ),
      );
  }

  private fetchCharacterAvatar(
    characterUrls: string[],
  ): Observable<Character[]> {
    const characterObservables = characterUrls.map((url) =>
      this.episodesService.getCharacterByUrl(url).pipe(
        map((character: Character) => ({
          ...character,
        })),
      ),
    );
    return forkJoin(characterObservables);
  }
}
