import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-counter-page',
  templateUrl: './counter-page.component.html',
  styleUrl: './counter-page.component.css'
})
export class CounterPageComponent {

  public counter = signal(0);
  public squeareComputed = computed(() => this.counter() ** 2);

  public increment(): void {
    this.counter.update((value) => value + 1);
  }

  public decrement(): void {
    this.counter.update((value) => value - 1);
  }

  public reset(): void {
    this.counter.set(0);
  }
}
