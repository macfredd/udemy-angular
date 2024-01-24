import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy{
  public isProductVisible: boolean = true;
  public currentPrice: number = 0;

  constructor() { }
  
  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges');
    console.log(JSON.stringify(changes));
  }
  
  ngOnInit(): void {
    console.log('ngOnInit');
  }

  ngDoCheck(): void {
    console.log('ProdcutComponent - ngDoCheck');
  }

  ngAfterContentInit(): void {
    console.log('ProdcutComponent - ngAfterContentInit');
  }

  ngAfterContentChecked(): void {
    console.log('ProdcutComponent - ngAfterContentChecked');
  }
  
  ngAfterViewInit(): void {
    console.log('ProdcutComponent - ngAfterViewInit');
  }

  ngAfterViewChecked(): void {
    console.log('ProdcutComponent - ngAfterViewChecked');
  }

  ngOnDestroy(): void {
    console.log('ProdcutComponent - ngOnDestroy');
  }

  increasePrice(): void {
    this.currentPrice ++;
  }

}
