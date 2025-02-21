import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Location } from '../../shared/models/locations.model';
import { LocationsService } from '../../core/services/locations.service';
import { Observable, tap, map } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { PAGE_SIZE } from '../../shared/constants/pageSize';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationsComponent implements OnInit {
  locations$: Observable<Location[]>;
  page: number = 1;
  pageSize: number = PAGE_SIZE;
  totalLocations: number = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['id', 'name', 'type', 'dimension'];

  constructor(
    private locationsService: LocationsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.page = params.page || 1;
      this.getLocations(params);
    });
  }

  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.router.navigate([], {
      queryParams: { page: this.page },
      queryParamsHandling: 'merge',
    });
    this.getLocations();
  }

  private getLocations(params?: Params): void {
    this.locations$ = this.locationsService
      .getLocationsByFilters(
        this.page,
        this.pageSize,
        params?.name,
        params?.dimension,
        params?.type,
      )
      .pipe(
        tap((response) => (this.totalLocations = response.info.count)),
        map((response) => response.results),
      );
  }
}
