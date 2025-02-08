import { NgModule } from '@angular/core';
import { RouterModule, Routes, Resolve } from '@angular/router';
import { TaskHomeComponent } from './task/task-home-page/task-home.component';
import { NotfoundComponent } from './shared/notfound/notfound.component';
import { TaskService } from './services/TaskService/task.service';
import { ResolverService } from './services/ResolverService';


const routes: Routes = [
  { path: '', component: TaskHomeComponent, resolve:{tasks : ResolverService}},
  {path: 'tasks', loadChildren: () => import('./task/task.module').then(m => m.TaskModule)},
  { path: '**', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
