import { Component } from '@angular/core';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrl: './btn-my-location.component.css'
})
export class BtnMyLocationComponent {


  constructor(private mapService: MapService,
    private placesService: PlacesService) { }

  public goToMyLocation() {
    this.mapService.flyTo(this.placesService.userLocation!);
  }
}
