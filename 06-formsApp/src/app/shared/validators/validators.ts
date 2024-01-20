import { FormControl, ValidationErrors } from "@angular/forms";

export const cantbeThisValue = (control : FormControl, value: string[]) : ValidationErrors => {
    if (value.map ( v => v.toLowerCase().trim()).includes(control.value.toLowerCase().trim())) {
        return {
            cantbeThisValue: true,
        }
    }
  return {};
}
