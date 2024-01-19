import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switch-page',
  templateUrl: './switch-page.component.html',
  styleUrl: './switch-page.component.css'
})
export class SwitchPageComponent {

  constructor(private forBuilder: FormBuilder) { }

  public form: FormGroup =  this.forBuilder.group({
    gender : ['M', Validators.required],
    wantsNotifications: [true, Validators.required],
    termsAndConditions: [false, Validators.requiredTrue]
  });

  onSave() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { termsAndConditions, ... newFormValue } = this.form.value;

    console.log(newFormValue);
  }

  isValidField(field: string): boolean | null {
    return this.form.controls[field].errors 
    && this.form.controls[field].touched;
  }

  getFieldError(field: string): string | null {

    if (!this.form.controls[field]) {
      return null;
    }

    const errors = this.form.controls[field].errors || {};

    for (const key in errors) {
      if (errors.hasOwnProperty(key)) {
        switch (key) {
          case 'required':
            return 'This field is required';
          case 'minlength':
            return `The minimum length is ${errors[key].requiredLength}`;
          case 'maxlength':
            return `The maximum length is  ${errors[key].requiredLength}`;
          case 'min':
            return `The minimum value is ${errors[key].min}`;
            case 'requiredTrue':
              return `You must accept the terms and conditions`;
          default:
            return null;
        }
      }
    }
    return null;
  }
}
