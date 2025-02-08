import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TaskItem } from '../../models/task';


const filters = [
  (task : TaskItem) => task,
  (task : TaskItem) => {
    task.dueDate.getMonth() === new Date().getMonth()
  }
  ,
  (task : TaskItem) => task.isComplete
];

@Component({
  selector: 'task-filter',
  standalone: false,

  templateUrl: './task-filter.component.html',
  styleUrl: './task-filter.component.css'
})
export class TaskFilterComponent implements OnInit{
  @Input() filter: any;
  @Output() filterChange = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    this.updateFilter('0');
  }

  listFilter : any = '0';

  updateFilter(value : any): void{
    switch(value){
      case '0':
        this.filter = (task : TaskItem) => !task.isComplete;
        break;
      case '1':
        this.filter = (task : TaskItem) => {
        return task.dueDate.getDate() == new Date().getDate() &&
          task.dueDate.getMonth() == new Date().getMonth() &&
          task.dueDate.getFullYear == new Date().getFullYear
        }
        break;
      case '2':
        this.filter = (task : TaskItem) => task.isComplete
        break;
    }

    this.filterChange.emit(this.filter);
  }


}
