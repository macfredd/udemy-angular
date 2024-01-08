import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heros.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styleUrl: './hero-page.component.css'
})
export class HeroPageComponent implements OnInit{

  public hero?: Heroe;

  constructor(private heroService: HeroesService, 
    private activatedRoute: ActivatedRoute,
    private router: Router) { }
  
  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap(({id}) => this.heroService.getHeroeById(id))
    ).subscribe(hero => {
      if (!hero) {
        return this.router.navigateByUrl('/heroes/list');
      }
      this.hero = hero; 

      return;
    });
  }

  public goBack(): void {
    this.router.navigateByUrl('/heros/list');
  }
}
