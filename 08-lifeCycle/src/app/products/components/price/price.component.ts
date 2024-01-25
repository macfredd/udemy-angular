import { JsonPipe } from '@angular/common';
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrl: './price.component.css'
})
export class PriceComponent  implements OnInit, OnChanges, OnDestroy {
  
  public interval$?: Subscription;

  @Input() price: number = 0;

  ngOnInit(): void {
    console.log('    PriceComponent - ngOnInit');

    this.interval$ = interval(1000).subscribe(value => {
      console.log('    PriceComponent - interval: ' + value);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('    PriceComponent - ngOnChanges');
    console.log('    ' + JSON.stringify(changes));
  }

  ngOnDestroy(): void {
    console.log('    PriceComponent - ngOnDestroy');
    this.interval$?.unsubscribe();
  }
}
