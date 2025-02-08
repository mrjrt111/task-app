import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TaskItem } from '../../models/task';
import { TaskService } from '../../services/TaskService/task.service';
import { Router } from '@angular/router';
@Component({
  selector: 'task-list-item',
  standalone: false,

  templateUrl: './task-list-item.component.html',
  styleUrl: './task-list-item.component.css'
})
export class TaskListItemComponent implements OnInit {

  @Input() task! : TaskItem;

  constructor(private taskService : TaskService, private router: Router){}

  ngOnInit(): void {
  }

  get IsStrikedStyling() : { [key: string]: boolean } {
    return {'strikeout text-muted': this.task.isComplete};
  }

  DeleteTask(): void{
    if (confirm("Are you sure you want to delete this task? Press OK to proceed.")){

      this.taskService.deleteTask(this.task.id).subscribe(
        (data: any) => {
          console.log(data);
          this.router.navigateByUrl(``);
        }
      );

    }
  }

  EditTask(): void{
    this.router.navigateByUrl(`tasks/${this.task.id}/edit`);
  }

  ToggleTaskCompletion(): void{
    this.task.isComplete = !this.task.isComplete;

    this.taskService.editTask(this.task).subscribe(
      (data: any) => {
        console.log(data);
      }
    );
  }

}
