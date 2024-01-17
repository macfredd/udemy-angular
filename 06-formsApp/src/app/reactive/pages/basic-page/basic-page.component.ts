import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basic-page',
  templateUrl: './basic-page.component.html',
  styleUrl: './basic-page.component.css'
})
export class BasicPageComponent {

  constructor(private formBuilder: FormBuilder) { }

  public productForm: FormGroup = this.formBuilder.group({
    name:     [ '', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    price:    [ 0, [Validators.required, Validators.min(0)]],
    quantity: [ 0, [Validators.required]]
  });

  onSubmit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }
    console.log(this.productForm.value);
  }

  isValidField(field: string): boolean | null {
    return this.productForm.controls[field].errors 
    && this.productForm.controls[field].touched;
  }

  getFieldError(field: string): string | null {

    if (!this.productForm.controls[field]) {
      return null;
    }

    const errors = this.productForm.controls[field].errors || {};

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
          default:
            return null;
        }
      }
    }
    return null;
  }
}
