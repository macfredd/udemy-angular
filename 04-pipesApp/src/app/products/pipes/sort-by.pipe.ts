import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product.interface';

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {

  transform(value: Product[], sortBy?: keyof Product | ''): Product[] {

    if (sortBy === '')
      return value;

    if (sortBy !== undefined)
      return value.sort((a, b) => (a[sortBy] > b[sortBy]) ? 1 : -1);

    return value;
    
  } 
}
