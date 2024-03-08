import { Component } from '@angular/core';
import { MapService, PlacesService } from '../../services';
import { Feature } from '../../interfaces/places-response.interface';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent {

  public selectedId: string = '';

  public showResults: boolean = true;

  constructor(private placesService: PlacesService,
    private mapService: MapService) { }

  get places(): Feature[] {
    return this.placesService.places;
  }

  get isLoadingPlaces() {
    return this.placesService.isLoadingPlaces;
  }
  
  flyToPlace(place: Feature) {
    this.selectedId = place.id;
    const [lng, lat] = place.center as [number, number];
    this.mapService.flyTo([lng, lat]);
  }

  getDirections(place: Feature) {

    if (!this.placesService.userLocation) {
      throw new Error('User location not found');
    }

    this.showResults = false;
    localStorage.setItem('selectedPlace', JSON.stringify(place));

    const start = this.placesService.userLocation;
    const end = place.center as [number, number];
    
    this.mapService.getRoutesBetweenPoints(start, end);
  }

  toggleShowResults() {
    const savedPlace = localStorage.getItem('selectedPlace');
    if (savedPlace) {
      this.selectedId = JSON.parse(savedPlace).id;
    }
    this.showResults = !this.showResults;
  }
}
