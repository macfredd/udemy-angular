import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product.interface';

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {

  transform(value: Product[], sortBy?: keyof Product | ''): Product[] {

    switch (sortBy) {
      case 'code':
        return value.sort((a, b) => (a.code > b.code) ? 1 : -1);
      case 'name':
        return value.sort((a, b) => (a.name > b.name) ? 1 : -1);
      case 'category':
        return value.sort((a, b) => (a.category > b.category) ? 1 : -1);
      case 'quantity':
        return value.sort((a, b) => (a.quantity > b.quantity) ? 1 : -1);
      case 'discount':
        return value.sort((a, b) => (a.discount > b.discount) ? 1 : -1);
      default:
        break;
    }
    return value;
  } 
}
