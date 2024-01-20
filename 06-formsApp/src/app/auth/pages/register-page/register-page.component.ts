import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { cantbeThisValue } from '../../../shared/validators/validators';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

  constructor(private formBuilder: FormBuilder) { }

  public form = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required]],
    userName: ['', 
      [ Validators.required, 
        Validators.minLength(5),
        (control: FormControl) => cantbeThisValue(control, ['admin', 'administrator', 'root'])
      ]
    ],
    password: ['', [Validators.required, Validators.minLength(8)]],
    password_confirmation: ['', [Validators.required]],
  });

  onSubmit() {
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    
    console.log(this.form.value);
  }
}
