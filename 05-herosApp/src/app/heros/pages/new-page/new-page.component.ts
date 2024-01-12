import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Heroe, Publisher } from '../../interfaces/heros.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrl: './new-page.component.css'
})
export class NewPageComponent implements OnInit {

  public  heroForm = new FormGroup({
    id:               new FormControl<string>(''),
    superhero:        new FormControl<string>('', {nonNullable: true}),
    publisher:        new FormControl<Publisher>(Publisher.DCComics),
    alter_ego:        new FormControl<string>(''),
    first_appearance: new FormControl<string>(''),
    characters:       new FormControl<string>(''),
    alt_img:          new FormControl<string>('')
  });

  public publishers = [
    {id:'DC Comics', desc: 'DC Comics'}, 
    {id:'Marvel Comics', desc: 'Marvel Comics'}];

  constructor(
    private heroService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }
  
  
  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;

    this.activatedRoute.params
    .pipe(
      switchMap(({ id }) => this.heroService.getHeroeById( id )),  
    ).subscribe(heroe => {
      if (!heroe) return this.router.navigateByUrl('/heroes/list'); 

      this.heroForm.reset(heroe);

      return;
    });
  }

  onSubmit() {
    if (this.currentHero.id) {
      this.heroService.updateHeroe(this.currentHero)
      .subscribe(resp => {
        // mostrar mensaje
      });

      return;
    }

    this.heroService.addHeroe(this.currentHero)
    .subscribe( resp => {
      // mostrar mensaje y navegar /heroes/list
    })
  }

  get currentHero(): Heroe {
    return this.heroForm.value as Heroe;
  }
}
