import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  constructor(private router: Router) {}

  addFilters(filterForm: FormGroup): void {
    const formValues = filterForm.value;
    const filteredValues = Object.entries(formValues)
      .filter(([key, value]) => value)
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    filteredValues['page'] = 1;

    this.router.navigate([], {
      queryParams: filteredValues,
      queryParamsHandling: 'merge',
    });
  }
}
