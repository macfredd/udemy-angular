import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent {

  private formBuilder =  inject( FormBuilder );
  
  public color: string = 'green';

  public productForm: FormGroup = this.formBuilder.group({
    name: ['', [ Validators.required, Validators.minLength(6), Validators.email]],
  });

  public changeColor(): void {
    this.color = this.generateRandomColor();
  }

  public generateRandomColor(): string {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
  }
}
