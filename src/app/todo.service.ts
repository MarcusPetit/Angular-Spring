import { Injectable } from '@angular/core';
import { Todo } from './todo';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  apiURL: string =
    'https://spring-boot-angular-production.up.railway.app/api/todo';

  constructor(private http: HttpClient) {}

  salvar(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.apiURL, todo);
  }
  listar(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiURL);
  }
  deletar(id: number): Observable<void> {
    const url = `${this.apiURL}/${id}`;
    return this.http.delete<void>(url);
  }

  marcarCOmoCOncluido(id: number): Observable<Todo> {
    const url = `${this.apiURL}/${id}/done`;
    return this.http.patch<Todo>(url, {});
  }
}
