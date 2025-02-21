import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TodoList } from '../../shared/models/todo-list.model';
import { WatchListService } from '../../core/services/watchList.service';
import { Episode } from '../../shared/models/episode.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../core/components/confirmDialog/confirm-dialog.component';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrl: './watch-list.component.scss',
})
export class WatchListComponent implements OnInit {
  newListForm: FormGroup;
  watchLists: TodoList[] = [];

  constructor(
    private fb: FormBuilder,
    private watchListService: WatchListService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.newListForm = this.fb.group({
      listName: [''],
    });
    this.watchListService.watchLists$.subscribe((lists) => {
      this.watchLists = lists;
    });
  }

  createNewList(): void {
    const listName = this.newListForm.get('listName')?.value;
    if (listName) {
      this.watchListService.createList(listName);
      this.newListForm.reset();
    }
  }

  removeList(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.watchListService.removeList(id);
      }
    });
  }

  removeEpisodeFromList(episodeId: string, listId: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.watchListService.removeEpisodeFromList(episodeId, listId);
      }
    });
  }

  saveEpisodeState(listId: string, episode: TodoList.SelectedEpisode): void {
    this.watchListService.saveEpisodeState(listId, episode);
  }
}
