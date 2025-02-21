import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/modules/shared.module';
import { RouterModule } from '@angular/router';
import { CharactersComponent } from './characters.component';
import { CharactersService } from '../../core/services/characters.service';
import { FilterCharactersComponent } from './filter-characters/filter-characters.component';
import { PopupComponent } from '../../core/components/popup/popup.component';
import { SpeciesStylePipe } from '../../shared/pipes/species-style.pipe';
import { StatusStylePipe } from '../../shared/pipes/status-style.pipe';
import { GenderStylePipe } from '../../shared/pipes/gender-style.pipe';

@NgModule({
  declarations: [
    CharactersComponent,
    FilterCharactersComponent,
    SpeciesStylePipe,
    StatusStylePipe,
    GenderStylePipe,
    PopupComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([{ path: '', component: CharactersComponent }]),
  ],
  providers: [CharactersService],
})
export class CharactersModule {}
