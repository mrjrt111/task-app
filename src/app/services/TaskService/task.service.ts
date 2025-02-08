import { UserConfigInterface } from '../../shared/routes/userConfigInterface';
import { TaskItem } from './../../models/task';
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  baseURL: string = "";

  constructor(private http: HttpClient, @Inject('USER_CONFIG_INTERFACE') config: UserConfigInterface) {
    this.baseURL = config.apiUrl;
   }

  private getStandardOptions() : any {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
  }

  getTasks(): Observable<TaskItem[]> {
    let options = this.getStandardOptions();

    options.params = new HttpParams({
      fromObject: {
        format: 'json'
      }
    });

    return this.http.get<TaskItem[]>(this.baseURL + 'tasks', options).pipe(catchError(this.handleError));

  }

  private handleError(error: HttpErrorResponse) : Observable<any> {
    if (error.status === 0) {
      console.error('There is an issue with the client or network:', error.error);
    } else {
      console.error('Server-side error: ', error.error)
    }

    return throwError(() => new Error('Cannot retrieve tasks from the server. Please try again.'));
  }

  addTask(task: TaskItem): Observable<TaskItem> {
    let options = this.getStandardOptions();

    options.headers = options.headers.set('Content-Type', 'application/json');
    return this.http.post<TaskItem>(`${this.baseURL}tasks/`, task).pipe(catchError(this.handleError));
  }

  getTask(id : string){

    let options = this.getStandardOptions();

    options.params = new HttpParams({
      fromObject: {
        format: 'json'
      }
    });
    return this.http.get<TaskItem>(`${this.baseURL}tasks/${id}`, options).pipe(catchError(this.handleError));

  }


  deleteTask (id : number): Observable<void>{

    let options = this.getStandardOptions();

    return this.http.delete<void>(`${this.baseURL}tasks/${id}`)
      .pipe(catchError(this.handleError));

  }

  editTask (task : TaskItem): Observable<void>{
    let options = this.getStandardOptions();
    options.params = new HttpParams({
      fromObject: {
        format: 'json'
      }
    });

    return this.http.put<void>(`${this.baseURL}tasks/${task.id}`, task, options)
      .pipe(catchError(this.handleError));

  }

}
