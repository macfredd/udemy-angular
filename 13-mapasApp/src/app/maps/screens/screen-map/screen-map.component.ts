import { Component } from '@angular/core';
import { PlacesService } from '../../services';

@Component({
  selector: 'app-screen-map',
  templateUrl: './screen-map.component.html',
  styleUrl: './screen-map.component.css'
})
export class ScreenMapComponent {

  constructor(private placesService: PlacesService) {
    
  }

}
