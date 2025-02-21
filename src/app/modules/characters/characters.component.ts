import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Character } from '../../shared/models/characters.model';
import { Observable, tap, map } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CharactersService } from '../../core/services/characters.service';
import { PAGE_SIZE } from '../../shared/constants/pageSize';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharactersComponent implements OnInit {
  characters$: Observable<Character[]>;
  page: number = 1;
  pageSize: number = PAGE_SIZE;
  totalCharacters: number = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private charactersService: CharactersService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.page = params.page;
      this.getCharacters(params);
    });
  }

  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.router.navigate([], {
      queryParams: { page: this.page },
      queryParamsHandling: 'merge',
    });
  }

  openDialog(character: Character): void {
    this.charactersService.openDialog(character);
  }

  private getCharacters(params?: Params): void {
    this.characters$ = this.charactersService
      .getCharactersByFilters(
        this.page,
        this.pageSize,
        params.status,
        params.gender,
        params.species,
      )
      .pipe(
        tap((response) => {
          this.totalCharacters = response.info.count;
        }),
        map((response) => response.results),
      );
  }
}
