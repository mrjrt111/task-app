import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddTaskFormComponent } from '../add-task-form/add-task-form.component';
import { TaskDetailsComponent } from '../task-details/task-details.component';
import { EditTaskFormComponent } from '../edit-task-form/edit-task-form.component';
import { DeactivateGuard } from '../../services/DeactivateGuardService';


const routes: Routes = [
  {path: "add", component: AddTaskFormComponent, canDeactivate:[DeactivateGuard]},
  { path: ':id', component: TaskDetailsComponent},
  { path: ':id/edit', component: EditTaskFormComponent, canDeactivate:[DeactivateGuard]},
 ];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class TasksRoutingModule { }
