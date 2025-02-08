import { TaskService } from './../../services/TaskService/task.service';
import { Component, OnInit } from '@angular/core';
import { TaskItem } from '../../models/task';

@Component({
  selector: 'task-home',
  standalone: false,

  templateUrl: './task-home.component.html',
  styleUrl: './task-home.component.css'
})
export class TaskHomeComponent implements OnInit{
  tasks : TaskItem[] = [];
  filter : any;

  constructor(private taskService : TaskService){

  }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(
      (data : any) => {
        this.tasks = data;
        for(let task of this.tasks){
          task.dueDate = new Date (task.dueDate);
        }
      },
      (error : any) => {
        alert(error.message);
      }
    );
  }
}
