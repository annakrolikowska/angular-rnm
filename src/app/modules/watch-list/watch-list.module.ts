import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/modules/shared.module';
import { RouterModule } from '@angular/router';
import { WatchListComponent } from './watch-list.component';
import { WatchListService } from '../../core/services/watchList.service';
import { TodoListComponent } from './todo-list/todo-list.component';
import { ConfirmDialogComponent } from '../../core/components/confirmDialog/confirm-dialog.component';
import { EpisodesService } from '../../core/services/episodes.service';

@NgModule({
  declarations: [WatchListComponent, TodoListComponent, ConfirmDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([{ path: '', component: WatchListComponent }]),
  ],
  providers: [WatchListService, EpisodesService],
})
export class WatchListModule {}
