import { FormControl, ValidationErrors } from "@angular/forms";

export const firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
export const emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";


export const cantbeThisValue = (control : FormControl, value: string[]) : ValidationErrors => {
    if (value.map ( v => v.toLowerCase().trim()).includes(control.value.toLowerCase().trim())) {
        return {
            cantbeThisValue: true,
        }
    }
  return {};
}
