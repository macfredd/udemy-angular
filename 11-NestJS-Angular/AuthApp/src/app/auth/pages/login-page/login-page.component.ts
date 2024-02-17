import { Component, inject } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  private formBuilder = inject(FormBuilder);

  private authSerice = inject(AuthService);

  public form: FormGroup = this.formBuilder.group({
    email: ['Felipe@gmail.com', [Validators.required, Validators.email]],
    password: ['felipecruz', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit() {
    console.log('Vino ACA');
    return this.authSerice.login(this.form.value.email, this.form.value.password)
    .subscribe((result) => {
      console.log('Result **', result);
    });
  }
}
