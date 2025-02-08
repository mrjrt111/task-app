import { Component, OnInit, Input } from '@angular/core';
import { TaskItem } from '../../models/task';

@Component({
  selector: 'task-list',
  standalone: false,
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit{
  @Input() tasks : TaskItem[] = [];
  constructor() { }

  ngOnInit(): void {
  }
}
