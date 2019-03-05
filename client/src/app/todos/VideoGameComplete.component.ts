import {Component, OnInit} from '@angular/core';
import {TodoListService} from './todo-list.service';
import {Todo} from './todo';
import {Observable} from 'rxjs/Observable';
import {MatDialog} from '@angular/material';
//import {AddTodoComponent} from './add-todo.component';

@Component({
  selector: 'VideoGameComplete-component',
  templateUrl: 'VideoGameComplete.component.html',
  styleUrls: ['./VideoGameComplete.component.css'],
})
export class VideoGameListComponent implements OnInit {
  // These are public so that tests can reference them (.spec.ts)
  public VideoGame: Todo[];
  public filteredVideoGame: Todo[];

  public VideoGameCategory: string;

  constructor(public todoListService: TodoListService, public dialog: MatDialog) {

  }

  public filterVideoGame(searchBody: string, searchCategory: string): Todo[] {

    this.filteredVideoGame = this.blanche;

    // Filter by body
    if (searchBody != null) {
      searchBody = searchBody.toLocaleLowerCase();

      this.filteredVideoGame = this.filteredVideoGame.filter(todo => {
        return !searchBody || todo.body.toLowerCase().indexOf(searchBody) !== -1;
      });
    }

    // Filter by category
    if (searchCategory != null) {
      this.filteredVideoGame = this.filteredVideoGame.filter(todo => {
        return !searchCategory || todo.category.toLowerCase().indexOf(searchCategory) !== -1;
      });
    }

    return this.filteredVideoGame;
  }

  refreshTodos(): Observable<Todo[]> {
    // Get Todos returns an Observable, basically a "promise" that
    // we will get the data from the server.
    //
    // Subscribe waits until the data is fully downloaded, then
    // performs an action on it (the first lambda)

    const VideoGame: Observable<Todo[]> = this.todoListService.getVideoGame('');
    VideoGame.subscribe(
      VideoGame => {
        this.VideoGame = VideoGame;
        this.filterVideoGame(this.VideoGameBody, this.VideoGameCategory);
      },
      err => {
        console.log(err);
      });
    return VideoGame;
  }

  loadService(): void {
    this.todoListService.getVideoGame(this.VideoGameCategory).subscribe(
      VideoGame => {
        this.VideoGame = VideoGame;
        this.filteredVideoGame = this.VideoGame;
      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnInit(): void {
    this.refreshTodos();
    this.loadService();
  }

}
