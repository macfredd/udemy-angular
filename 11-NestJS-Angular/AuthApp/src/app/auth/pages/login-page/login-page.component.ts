import { Component, inject } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

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
    return this.authSerice.login(this.form.value.email, this.form.value.password)
    .subscribe({
      next: () => console.log('Logged in'),
      error: (error) => {

        var errMessage = '';

        if (error instanceof Array) {
          error.forEach((err) => {
            errMessage += err + '<br>';
          });
          error = errMessage;
        } else {
          errMessage = error.message;
        }
        Swal.fire('Error', error, 'error')
      }
    });
  }
}
