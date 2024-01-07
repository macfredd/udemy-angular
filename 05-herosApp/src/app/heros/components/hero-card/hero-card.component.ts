import { Component, Input, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heros.interface';

@Component({
  selector: 'heros-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrl: './hero-card.component.css'
})
export class HeroCardComponent implements OnInit{

  @Input() 
  public hero!: Heroe;

  ngOnInit(): void {
    if(!this.hero){
      throw new Error('HeroCardComponent: Hero is required');
    }
  }
}
