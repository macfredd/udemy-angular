import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { PlacesService } from '../../services';
import { Map } from 'mapbox-gl';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.css'
})
export class MapViewComponent implements AfterViewInit {

  constructor(private placesService: PlacesService) {
    console.log(this.placesService.userLocation);
  }

  @ViewChild('map') divMap!: ElementRef;
  
  ngAfterViewInit(): void {
    const map = new Map({
      accessToken: environment.mapbox_key,
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.placesService.userLocation,
      zoom: 15,
      });
  }

}
