import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Character } from '../../../shared/models/characters.model';
import { CharactersFilters } from '../../../shared/models/filter.model';
import { Router } from '@angular/router';
import { FilterService } from '../../../core/services/filter.service';

@Component({
  selector: 'app-filter-characters',
  templateUrl: './filter-characters.component.html',
})
export class FilterCharactersComponent implements OnInit {
  filterForm: FormGroup;
  filteredCharacters: Character[] = [];

  constructor(
    private fb: FormBuilder,
    private filterService: FilterService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.filterForm = this.fb.group({
      species: [''],
      status: [''],
      gender: [''],
    });
  }

  statusOptions: CharactersFilters[] = [
    { value: 'alive' },
    { value: 'dead' },
    { value: 'unknown' },
  ];

  genderOptions: CharactersFilters[] = [
    { value: 'male' },
    { value: 'female' },
    { value: 'genderless' },
    { value: 'unknown' },
  ];

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
