import { Component } from '@angular/core';
import { PlacesService } from '../../services';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {

  constructor(private placesService: PlacesService) { }

  private debounceTime?: NodeJS.Timeout;

  onQueryChange(query: string = '') {
    if (this.debounceTime) {
      clearTimeout(this.debounceTime);
    }

    this.debounceTime = setTimeout(() => {
      this.placesService.getPlaces(query);
    }, 1000);

  }
}
