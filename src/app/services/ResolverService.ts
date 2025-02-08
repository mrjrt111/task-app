import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TaskService } from './TaskService/task.service';

@Injectable({
  providedIn: 'root'
})
export class ResolverService implements Resolve<any> {

  constructor(private task: TaskService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    console.log('Called Get Tasks in resolver...', route);
    return this.task.getTasks().pipe(
      catchError(error => {
        return of('No data');
      })
    );
  }
}
