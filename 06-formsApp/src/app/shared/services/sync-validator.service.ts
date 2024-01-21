import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({providedIn: 'root'})
export class SyncValidatorService {
    
    public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
    public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
    
    

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
                case 'notEqual':
                    return `The fields are not equal`;
                default:
                    return null;
                }
            }
        }

        return null;
    }

    public cantbeThisValue = (control : FormControl, value: string[]) : ValidationErrors => {
        if (value.map ( v => v.toLowerCase().trim()).includes(control.value.toLowerCase().trim())) {
            return {
                cantbeThisValue: true,
            }
        }
      return {};
    }

    /**
     * Compare two fields of a form and return an error if they are not equal 
     * 
     * @param field1 Field name 1 to compare
     * @param field2 Field name 2 to compare
     * 
     * @returns  A function that compares the values of the fields and 
     * returns null if they are equal or an error if they are not equal
     */
    public fieldsMatch = (field1: string, field2: string) => {
        return (formGroup: AbstractControl): ValidationErrors | null => {
            const control1 = formGroup.get(field1);
            const control2 = formGroup.get(field2);
            const fieldValue1 = control1?.value;
            const fieldValue2 = control2?.value;

            if (fieldValue1 === fieldValue2) {
                control2?.setErrors(null);
            } else {
                control2?.setErrors({ notEqual: true });
            }

            return null;
        }
    }
}