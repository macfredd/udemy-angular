import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({providedIn: 'root'})
export class SyncValidatorService {
    
    public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
    public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
    
    public cantbeThisValue = (control : FormControl, value: string[]) : ValidationErrors => {
        if (value.map ( v => v.toLowerCase().trim()).includes(control.value.toLowerCase().trim())) {
            return {
                cantbeThisValue: true,
            }
        }
      return {};
    }

    public isValidField(form: FormGroup, field: string): boolean | null {
        return form.controls[field].errors 
        && form.controls[field].touched;
      }
    
    public isValidFieldArray(formArray: FormArray, index: number): boolean | null {
        return formArray.controls[index].errors 
        && formArray.controls[index].touched;
    }
    
    public getFieldError(form: FormGroup, field: string): string | null {
    
        if (!form.controls[field]) {
        return null;
        }

        const errors = form.controls[field].errors || {};

        for (const key in errors) {
            if (errors.hasOwnProperty(key)) {
                switch (key) {
                case 'required':
                    return 'This field is required';
                case 'minlength':
                    return `The minimum length is 
                            ${errors[key].requiredLength}`;
                case 'maxlength':
                    return `The maximum length is 
                            ${errors[key].requiredLength}`;
                case 'min':
                    return `The minimum value is 
                            ${errors[key].min}`;
                case 'emailTaken':
                    return `The email is already taken`;
                default:
                    return null;
                }
            }
        }

        return null;
    }
}