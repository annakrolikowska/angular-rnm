import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../../shared/constants/api';
import { ApiResponse } from '../../shared/models/locations.model';
import {
  LocationName,
  Dimension,
  Type,
} from '../../shared/models/filter.model';

@Injectable({
  providedIn: 'root',
})
export class LocationsService {
  constructor(private http: HttpClient) {}

  getLocations(page: number, pageSize: number): Observable<ApiResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<ApiResponse>(`${API_URL}location`, { params });
  }

  getLocationsByFilters(
    page: number,
    pageSize: number,
    name?: LocationName,
    dimension?: Dimension,
    type?: Type,
  ): Observable<ApiResponse> {
    const params = new HttpParams({
      fromObject: {
        page: page.toString(),
        pageSize: pageSize.toString(),
        ...(name && { name: name }),
        ...(dimension && { dimension: dimension }),
        ...(type && { type: type }),
      },
    });

    return this.http.get<ApiResponse>(`${API_URL}location`, { params });
  }
}
