import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/modules/shared.module';
import { RouterModule } from '@angular/router';
import { DialogComponent } from '../../core/components/dialog/dialog.component';
import { EpisodesComponent } from './episodes.component';
import { EpisodesService } from '../../core/services/episodes.service';
import { FilterEpisodesComponent } from './filter-episodes/filter-episodes.component';
import { WatchListService } from '../../core/services/watchList.service';

@NgModule({
  declarations: [EpisodesComponent, FilterEpisodesComponent, DialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([{ path: '', component: EpisodesComponent }]),
  ],
  providers: [EpisodesService, WatchListService],
})
export class EpisodesModule {}
