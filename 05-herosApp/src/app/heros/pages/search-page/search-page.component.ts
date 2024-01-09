import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heros.interface';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent {

  public searchControl = new FormControl('');

  public heros: Heroe[] = [];

  public heroSelected: Heroe | undefined;

  constructor( private herosService: HeroesService) { }

  searchHero() {
    const value: string = this.searchControl.value || '';

    this.herosService.getSuggestions( value.trim() )
    .subscribe( heros => this.heros = heros)
  }

  onOptionSelected( event: MatAutocompleteSelectedEvent ) {
    if (!event.option.value) {
      this.heroSelected = undefined;
      return;
    }

    const hero: Heroe = event.option.value;
    this.searchControl.setValue( hero.superhero );
    this.heroSelected = hero;
  }
}
