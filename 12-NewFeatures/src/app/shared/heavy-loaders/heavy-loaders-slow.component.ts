import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-heavy-loaders-slow',
  standalone: true,
  imports: [],
  templateUrl: './heavy-loaders-slow.component.html',
  styles: ``
})
export class HeavyLoadersSlowComponent implements OnInit{

  @Input({required: true}) public id!: string;
  @Input({required: true}) public className!: string;

  constructor() { 
    // Código bloqueante, no hagas esto en casa!
    const start = Date.now();
    while (Date.now() - start < 2000) {}
  }
  ngOnInit(): void {
    console.log('HeavyLoadersSlowComponent created: ' + this.id);
  }
}
