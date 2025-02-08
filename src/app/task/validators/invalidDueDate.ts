import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export function createInvalidDueDateValidator() : ValidatorFn {
  return (control: AbstractControl) : ValidationErrors | null =>  {
      const value = control.value?.toLowerCase();

      if (!value) {
          return null;
      }

      let dueDate = new Date(value);
      let currentDate = new Date();
      const matches = dueDate.getDay() < currentDate.getDay() ||
      dueDate.getMonth() < currentDate.getMonth() ||
      dueDate.getFullYear() < currentDate.getFullYear();

      return matches ? {invalidDueDate : true} : null;
  }
}
