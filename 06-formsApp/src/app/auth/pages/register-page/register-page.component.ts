import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { SyncValidatorService } from '../../../shared/services/sync-validator.service';
import { AsyncEmailValidator } from '../../../shared/validators/async-email-validator';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

  constructor(
    private formBuilder: FormBuilder,
    private validatorService: SyncValidatorService) { }

  public form = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(6), Validators.pattern(this.validatorService.firstNameAndLastnamePattern)]],
    email: ['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)], [new AsyncEmailValidator()]],
    userName: ['', 
      [ Validators.required, 
        Validators.minLength(5),
        (control: FormControl) => this.validatorService.cantbeThisValue(control, ['admin', 'administrator', 'root'])
      ]
    ],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password_confirmation: ['', [Validators.required]],
  }, {
      validators:[
        this.validatorService.fieldsMatch('password', 'password_confirmation')
        ]
      }
  );

  onSubmit() {
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    
    console.log(this.form.value);
  }

  isValidField(field: string) {
    return this.validatorService.isValidField(this.form, field );
  }

  getErrorMessage(field: string) {
    return this.validatorService.getFieldError(this.form, field );
  }
}
