import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toggleCase'
})
export class ToggleCasePipe implements PipeTransform {

  transform(value: string): string {
    if (!value || typeof value !== 'string' || value.length === 0 ) {
      return '';
    }

    if (value === value.toUpperCase()) {
      return value.toLowerCase();
    } else {
      return value.toUpperCase();
    }
  }

}
