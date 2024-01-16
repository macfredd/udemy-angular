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
      return;
    }
    console.log(this.productForm.value);
  }
}
