import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Episode } from '../../../shared/models/episode.model';
import { Router } from '@angular/router';
import { FilterService } from '../../../core/services/filter.service';

@Component({
  selector: 'app-filter-episodes',
  templateUrl: './filter-episodes.component.html',
})
export class FilterEpisodesComponent implements OnInit {
  filterForm: FormGroup;
  filteredEpisodes: Episode[] = [];

  constructor(
    private fb: FormBuilder,
    private filterService: FilterService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.filterForm = this.fb.group({
      name: [''],
    });
  }

  addFilters() {
    this.filterService.addFilters(this.filterForm);
  }

  resetForm() {
    this.filterForm.reset();
    this.router.navigate([], {
      queryParams: {},
    });
  }
}
