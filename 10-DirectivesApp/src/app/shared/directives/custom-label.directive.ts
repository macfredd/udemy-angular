import { Directive, ElementRef, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]'
})
export class CustomLabelDirective {

  private _errors: ValidationErrors | null | undefined  = null;
  @Input() set errors(value: ValidationErrors | null | undefined) {
    this._errors = value;
    this.setErrorMessages()
  }

  private htmlElement?: ElementRef<HTMLElement>;

  constructor( private el: ElementRef<HTMLElement>) { 
    this.htmlElement = el;
  }

  setErrorMessages(): void {
    if (!this.el) return;

    if (!this._errors ) {
      this.el.nativeElement.textContent = '';
      return;
    }

    const errors = Object.keys(this._errors || {}); 

    if (errors.includes('required')) {
      this.el.nativeElement.textContent = 'This field is required';
      return;
    }

    if (errors.includes('minlength')) {
      const reqLen = this._errors['minlength'].requiredLength;
      this.el.nativeElement.textContent = 
        `This field must be at least ${reqLen} characters long`;
      return;
    }

    if (errors.includes('email')) {
      this.el.nativeElement.textContent = 
        'This field must be a valid email';
      return;
    }
  }
}
