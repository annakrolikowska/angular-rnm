import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../../shared/constants/api';
import { PopupComponent } from '../../core/components/popup/popup.component';
import { MatDialog } from '@angular/material/dialog';
import { Character } from '../../shared/models/characters.model';
import { ApiResponse } from '../../shared/models/characters.model';
import { Gender, Status, Species } from '../../shared/models/filter.model';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
  ) {}

  getCharacters(page: number, pageSize: number): Observable<ApiResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<ApiResponse>(`${API_URL}character`, { params });
  }

  getCharactersByFilters(
    page: number,
    pageSize: number,
    status?: Status,
    gender?: Gender,
    species?: Species,
  ): Observable<ApiResponse> {
    const params = new HttpParams({
      fromObject: {
        page: page,
        pageSize: pageSize.toString(),
        ...(status && { status: status }),
        ...(gender && { gender: gender }),
        ...(species && { species: species }),
      },
    });

    return this.http.get<ApiResponse>(`${API_URL}character`, { params });
  }

  openDialog(character: Character): void {
    this.dialog.open(PopupComponent, {
      data: {
        id: character.id,
        name: character.name,
        image: character.image,
        status: character.status,
        species: character.species,
        type: character.type,
        gender: character.gender,
        location: character.location.name,
      },
    });
  }
}
