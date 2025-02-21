import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TodoList } from '../../shared/models/todo-list.model';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import {
  addDoc,
  arrayUnion,
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { collectionPath } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WatchListService {
  private static readonly COLLECTION_PATH = collectionPath;
  private watchListsSource = new BehaviorSubject<TodoList[]>([]);
  private auth = inject(Auth);

  watchLists$ = this.watchListsSource.asObservable();

  constructor(private firestore: Firestore) {
    this.loadWatchLists();
    this.registerAuthObserver();
  }

  createList(listName: string): void {
    const newList: TodoList = {
      ownerId: this.auth.currentUser.uid,
      listName: listName,
      selectedEpisodes: [],
    };
    const watchListCollection = collection(
      this.firestore,
      WatchListService.COLLECTION_PATH,
    );
    addDoc(watchListCollection, newList).then(() => this.loadWatchLists());
  }

  addEpisodeToList(listId: string, episode: TodoList.SelectedEpisode): void {
    const watchListDocument = doc(
      this.firestore,
      WatchListService.COLLECTION_PATH,
      listId,
    );
    updateDoc(watchListDocument, {
      selectedEpisodes: arrayUnion(episode),
    }).then(() => this.loadWatchLists());
  }

  saveEpisodeState(listId: string, newEpisode: TodoList.SelectedEpisode): void {
    const watchListDocument = doc(
      this.firestore,
      WatchListService.COLLECTION_PATH,
      listId,
    );
    getDoc(watchListDocument)
      .then((docSnap) => {
        const list: TodoList = docSnap.data() as TodoList;
        const episodes = list.selectedEpisodes ?? [];
        const updatedEpisodes = episodes.map((episode) =>
          episode.id === newEpisode.id
            ? { ...episode, checked: newEpisode.checked }
            : episode,
        );
        updateDoc(watchListDocument, {
          selectedEpisodes: updatedEpisodes,
        }).then(() => {
          this.loadWatchLists();
        });
      })
      .catch((error) => console.error('Error updating document:', error));
  }

  removeEpisodeFromList(episodeId: string, listId: string): void {
    const watchListDocument = doc(
      this.firestore,
      WatchListService.COLLECTION_PATH,
      listId,
    );
    getDoc(watchListDocument)
      .then((docSnap) => {
        const list: TodoList = docSnap.data() as TodoList;
        const episodes = list.selectedEpisodes ?? [];
        const updatedEpisodes = episodes.filter((episode) => {
          return episode.id === episodeId;
        });

        updateDoc(watchListDocument, {
          selectedEpisodes: updatedEpisodes,
        }).then(() => this.loadWatchLists());
      })
      .catch((error) => console.error('Error updating document:', error));
  }

  removeList(listId: string): void {
    const watchListDocument = doc(
      this.firestore,
      WatchListService.COLLECTION_PATH,
      listId,
    );
    deleteDoc(watchListDocument);
  }

  public clearDataOnLogout(): void {
    this.watchListsSource.next([]);
  }

  private loadWatchLists(): void {
    const uid = this.auth?.currentUser?.uid;
    const itemCollectionRef = collection(
      this.firestore,
      WatchListService.COLLECTION_PATH,
    );
    const q = query(itemCollectionRef, where('ownerId', '==', uid));

    collectionData(q, { idField: 'id' }).subscribe((data) =>
      this.watchListsSource.next(data as TodoList[]),
    );
  }

  private registerAuthObserver(): void {
    onAuthStateChanged(this.auth, (user) => {
      if (!user) {
        this.clearDataOnLogout();
      } else {
        this.loadWatchLists();
      }
    });
  }
}
