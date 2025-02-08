export class TaskItem {

  id : number;
  name : string = "";
  description : string = "";
  dueDate : Date = new Date();
  isComplete : boolean = false;


  constructor(name : string,
    description : string , dueDate : Date) {
      this.name = name;
      this.description = description;
      this.dueDate = dueDate;
  }
}
