import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TodoList } from '../../../shared/models/todo-list.model';
import { Episode } from '../../../shared/models/episode.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
  @Input() todoList: TodoList;
  @Input() episode: Episode;
  @Output() remove = new EventEmitter<string>();
  @Output() episodeStateChange = new EventEmitter<Episode>();
  @Output() episodeRemoved = new EventEmitter<{
    episodeId: number;
    listId: string;
  }>();

  onRemove(): void {
    this.remove.emit(this.todoList.id);
  }

  onRemoveEpisode(episodeId: number, listId: string): void {
    this.episodeRemoved.emit({ episodeId, listId });
  }

  onEpisodeStateChange(episode: Episode): void {
    this.episodeStateChange.emit(episode);
  }
}
