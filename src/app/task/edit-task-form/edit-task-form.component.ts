import { IDeactivateComponent } from './../../shared/guard/IDeactivateComponent';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TaskItem } from '../../models/task';
import { TaskService } from '../../services/TaskService/task.service';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { createInvalidDueDateValidator } from '../validators/invalidDueDate';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DatePipe, formatDate } from '@angular/common'

const invalidDueDate = createInvalidDueDateValidator();

@Component({
  selector: 'edit-task-form',
  standalone: false,

  templateUrl: './edit-task-form.component.html',
  styleUrl: './edit-task-form.component.css'
})
export class EditTaskFormComponent implements OnInit, IDeactivateComponent{

  task: any = {};
  hasTaskBeenModified = false;

  taskForm = new FormGroup({
      nameFormControl: new FormControl('', [Validators.required, Validators.maxLength(32)]),
      descriptionFormControl: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      dueDateFormControl: new FormControl('', [Validators.required, invalidDueDate])
    });

  constructor(private taskService : TaskService, private route: ActivatedRoute, private router : Router, public dataPipe : DatePipe) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');

      if (id) {
        this.taskService.getTask(id).subscribe(
          (task : any)=> {
            this.task = task
            let dueDateString = this.dataPipe.transform(this.task.dueDate, 'yyyy-MM-dd');
            this.taskForm.controls['nameFormControl'].setValue(this.task.name);
            this.taskForm.controls['descriptionFormControl'].setValue(this.task.description);
            this.taskForm.controls['dueDateFormControl'].setValue(dueDateString);

            let dueDate = new Date (this.taskForm.controls["dueDateFormControl"].value);
            
            if (this.taskForm.controls["dueDateFormControl"].invalid){
              this.taskForm.controls["dueDateFormControl"].
            }

          })
      }
    })
  }
    editTask() : void{

      let dueDate = new Date (this.taskForm.controls["dueDateFormControl"].value);
      let modifiedTask = new TaskItem(this.taskForm.controls["nameFormControl"].value, this.taskForm.controls["descriptionFormControl"].value, dueDate);

      modifiedTask.id = this.task.id;
      modifiedTask.isComplete = this.task.isComplete;

      this.taskService.editTask(modifiedTask).subscribe(
        (data: any) => {
          console.log(data);
          this.hasTaskBeenModified = true;
          this.router.navigateByUrl(`tasks/${this.task.id}`);
        }
      );
    }

    canExit() : boolean {

      if (!this.hasTaskBeenModified && (this.taskForm.controls["nameFormControl"].dirty ||
        this.taskForm.controls["descriptionFormControl"].dirty ||
        this.taskForm.controls["dueDateFormControl"].dirty)){

          if (confirm("You have unsaved changes. Do you want to return to home? Press OK to proceed.")) {
            return true
          } else {
            return false
          }
        }
        else{
          this.hasTaskBeenModified = false;
          return true;
        }
      }
}
