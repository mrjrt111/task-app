import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { TaskListItemComponent } from './task-list-item/task-list-item.component';
import { TaskListComponent } from './task-list/task-list.component';
import { AddTaskFormComponent } from './add-task-form/add-task-form.component';
import { TaskFilterComponent } from './task-filter/task-filter.component';
import { TaskHomeComponent } from './task-home-page/task-home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskDetailsComponent } from './task-details/task-details.component';

import { RouterModule } from '@angular/router';
import { EditTaskFormComponent } from './edit-task-form/edit-task-form.component';
import { DatePipe } from '@angular/common';
import { TasksRoutingModule } from './tasks-routing/tasks-routing.module';
import { DeactivateGuard } from '../services/DeactivateGuardService';


@NgModule({
  declarations: [
    TaskListItemComponent,
    TaskListComponent,
    AddTaskFormComponent,
    TaskFilterComponent,
    TaskHomeComponent,
    TaskDetailsComponent,
    EditTaskFormComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    TasksRoutingModule
  ],
  exports:[
    TaskHomeComponent
  ],
  providers: [DatePipe,
    {provide: 'USER_CONFIG_INTERFACE', useValue: {apiUrl: 'http://localhost:3000/'}},
    DeactivateGuard

  ]
})
export class TaskModule { }
