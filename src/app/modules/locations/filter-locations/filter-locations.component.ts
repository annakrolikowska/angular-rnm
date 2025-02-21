import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FilterService } from '../../../core/services/filter.service';

@Component({
  selector: 'app-filter-locations',
  templateUrl: './filter-locations.component.html',
})
export class FilterLocationsComponent implements OnInit {
  filterForm: FormGroup;
  filteredLocations: Location[] = [];

  constructor(
    private fb: FormBuilder,
    private filterService: FilterService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.filterForm = this.fb.group({
      name: [''],
      type: [''],
      dimension: [''],
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
