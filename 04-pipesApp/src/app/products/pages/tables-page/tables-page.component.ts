import { Component } from '@angular/core';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-tables-page',
  templateUrl: './tables-page.component.html',
  styleUrl: './tables-page.component.css'
})
export class TablesPageComponent {

  public sortBy?: keyof Product | '' = '';

  public products: Product[] = [{
    code: 'AAA-1111',
    name: 'PlayStation 5',
    category: 'Games',
    quantity: 10,
    discount: true
  },{
    code: 'BBB-2222',
    name: 'Iphone 12',
    category: 'Phones',
    quantity: 20,
    discount: false
  },{
    code: 'CCC-3333',
    name: 'Bose Headphones 700',
    category: 'Headphones',
    quantity: 30,
    discount: false
  },{
    code: 'DDD-4444',
    name: 'Laptop Asus ROG Strix G15',
    category: 'Laptops',
    quantity: 40,
    discount: true
  },{
    code: 'EEE-5555',
    name: 'Keyboard HyperX Alloy Origins',
    category: 'Keyboards',
    quantity: 50,
    discount: false

  }]

  public changeSort(sortBy: keyof Product | ''): void {
    console.log(sortBy);
    this.sortBy = sortBy;
  }
}

