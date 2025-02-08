import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TaskService } from '../../services/TaskService/task.service';

@Component({
  selector: 'task-details',
  standalone: false,

  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.css'
})
export class TaskDetailsComponent implements OnInit{

  task: any = {};
  status: string = "";

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');

      if (id) {
        this.taskService.getTask(id).subscribe((task: any) => {
          this.task = task
          console.log(
            "HERE"
          );
          this.setStatus();

        });
      }
    })

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

  setStatus(): void{
    if (this.task.isComplete){
      this.status = "Completed";
    }
    else{
      this.status = "Not Completed";
    }
  }

}
