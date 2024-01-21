import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AsyncEmailValidator implements AsyncValidator {
    
    constructor() { }

    validate(control: AbstractControl): Observable<ValidationErrors | null> {
        console.log('AsyncEmailValidator');
        const email = control.value;

        const httpCallObservable = new Observable<ValidationErrors | null>( (suscriber) => {
            if (email === 'example@domain.com') {
                suscriber.next({ emailTaken: true });
                suscriber.complete();
            }

            suscriber.next(null);
            suscriber.complete();
        })

        return httpCallObservable;
    }
    
}