import { Component, OnInit } from '@angular/core';
import { TaskItem } from '../../models/task';
import { TaskService } from './../../services/TaskService/task.service';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { createInvalidDueDateValidator } from '../validators/invalidDueDate';
import { Router } from '@angular/router';
import { IDeactivateComponent } from '../../shared/guard/IDeactivateComponent';


const invalidDueDate = createInvalidDueDateValidator();

@Component({
  selector: 'add-task-form',
  standalone: false,

  templateUrl: './add-task-form.component.html',
  styleUrl: './add-task-form.component.css'
})
export class AddTaskFormComponent implements OnInit, IDeactivateComponent{

  hasTaskBeenAdded = false;

  taskForm = new FormGroup({
    nameFormControl: new FormControl('', [Validators.required, Validators.maxLength(32)]),
    descriptionFormControl: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    dueDateFormControl: new FormControl('', [Validators.required, invalidDueDate])
  });

  constructor(private taskService : TaskService, private router : Router) {
   }
  ngOnInit(): void {
  }

  addNewTask () : void{
    let dueDate = new Date (this.taskForm.controls["dueDateFormControl"].value);
    let task = new TaskItem(this.taskForm.controls["nameFormControl"].value,
        this.taskForm.controls["descriptionFormControl"].value, dueDate);

    this.taskService.addTask(task).subscribe(
      (data: any) => {
        console.log(data);
        this.router.navigateByUrl(`tasks/${data.id}`);
        this.hasTaskBeenAdded = true;
      }
    );
  }

  canExit() : boolean {

    if (!this.hasTaskBeenAdded && (this.taskForm.controls["nameFormControl"].dirty ||
      this.taskForm.controls["descriptionFormControl"].dirty ||
      this.taskForm.controls["dueDateFormControl"].dirty)){

        if (confirm("You have unsaved changes. Do you want to return to home? Press OK to proceed.")) {
          return true
        } else {
          return false
        }
      }
      else{
        this.hasTaskBeenAdded = false;
        return true;
      }
  }
}
