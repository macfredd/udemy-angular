import { Component } from '@angular/core';

@Component({
  selector: 'counter-alone',
  standalone: true,
  imports: [],
  templateUrl: './counter-alone.component.html',
  styleUrl: './counter-alone.component.css'
})
export class CounterAloneComponent {

  public counter: number = 0;
  
  decrement() {
    this.counter--;
  }

  increment() {
    this.counter++;
  }
}
