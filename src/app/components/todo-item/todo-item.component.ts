import { Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { Todo } from 'src/app/models/Todo';
import {TodoService} from '../../services/todo.service';
@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo!:Todo;
  constructor(private todoService:TodoService) { }
  @Output() deleteTodo:EventEmitter<Todo>=new EventEmitter;
  ngOnInit(): void {
  }
  setClasses(){
    let classes={
      todo:true,
      'is-complete':this.todo.completed
    }
    return classes;
  }
  onToggle(todo:Todo){
    //toggle in UI
    todo.completed=!this.todo.completed;
    //toggle on server
    this.todoService.toggleCompleted(todo).subscribe(todo=>console.log(todo));
  }
  onDelete(todo:Todo){
    this.deleteTodo.emit(todo);
  }
}
