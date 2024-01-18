import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dinamic-page',
  templateUrl: './dinamic-page.component.html',
  styleUrl: './dinamic-page.component.css'
})
export class DinamicPageComponent {

  constructor(private formBuilder: FormBuilder) { }

  public form: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.formBuilder.array([
      ['Metal Gear', Validators.required],
      ['Final Fantasy', Validators.required],
      ['The Witcher', Validators.required]
    ])
  });

  public newFavorite: FormControl = new FormControl('', [Validators.required, Validators.minLength(3)]);

  get favoriteGames() {
    return this.form.get('favoriteGames') as FormArray;
  }

  isValidNewFavorite(): boolean | null {
    return this.newFavorite.invalid 
    && this.newFavorite.touched;
  }

  isValidField(field: string): boolean | null {
    return this.form.controls[field].errors 
    && this.form.controls[field].touched;
  }

  isValidFieldArray(formArray: FormArray, index: number): boolean | null {
    return formArray.controls[index].errors 
    && formArray.controls[index].touched;
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
          default:
            return null;
        }
      }
    }
    return null;
  }
  
  onDelete(index: number) {
    this.favoriteGames.removeAt(index);
  }

  onAdd() {
    if (this.newFavorite.invalid) {
      return;
    }

    const newGameName = this.newFavorite.value;

    this.favoriteGames.push(this.formBuilder.control(newGameName, Validators.required));
    this.newFavorite.reset();
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    (this.form.controls['favoriteGames'] as FormArray) = 
    this.formBuilder.array([]); 
    this.form.reset();
  }
}
