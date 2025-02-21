import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TodoList } from '../../../shared/models/todo-list.model';
import { WatchListService } from '../../services/watchList.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  selectedList: TodoList;
  watchLists: TodoList[] = [];
  watchLists$: Observable<TodoList[]>;
  episodeExists: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private watchListService: WatchListService,
  ) {
    this.watchLists$ = this.watchListService.watchLists$;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onListSelected(list: TodoList): void {
    this.selectedList = list;
    this.episodeExists = list.selectedEpisodes.some(
      (e) => e.name === this.data.episode.name,
    );
  }
}
