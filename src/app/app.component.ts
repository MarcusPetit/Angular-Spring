import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Todo } from './todo';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  todos: Todo[] = [];
  
  constructor(private service: TodoService) {}

  ngOnInit(): void {
    this.listarTodos();
    throw new Error('Method not implemented.');
  }
  listarTodos() {
    this.service.listar().subscribe((todoList) => {
      console.log(todoList);

      this.todos = todoList;
    });
  }

  form: FormGroup = new FormGroup({
    description: new FormControl('Java', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  submit() {
    const todo: Todo = { ...this.form.value };
    this.service.salvar(todo).subscribe((todo) => {
      this.todos.push(todo);
      this.form.reset();
    });
  }
  delete(todo: Todo) {
    this.service.deletar(todo.id).subscribe({
      next: (response) => this.listarTodos(),
    });
  }
  done(todo: Todo) {
    this.service.marcarCOmoCOncluido(todo.id).subscribe({
      next: (todoAtualizado) => {
        todo.done = todoAtualizado.done;
        todo.doneDate = todoAtualizado.doneDate;
      },
    });
  }
}
