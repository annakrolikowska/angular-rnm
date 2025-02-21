import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LocationsComponent } from './locations.component';
import { LocationsService } from '../../core/services/locations.service';
import { FilterLocationsComponent } from './filter-locations/filter-locations.component';
import { SharedModule } from '../../shared/modules/shared.module';

@NgModule({
  declarations: [LocationsComponent, FilterLocationsComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([{ path: '', component: LocationsComponent }]),
  ],
  providers: [LocationsService],
})
export class LocationsModule {}
