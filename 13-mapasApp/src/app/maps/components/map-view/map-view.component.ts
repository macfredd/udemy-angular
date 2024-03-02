import { AfterViewInit, Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { MapService, PlacesService } from '../../services';
import { LngLat, Map, Marker, MarkerOptions, Popup } from 'mapbox-gl';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.css',
  encapsulation: ViewEncapsulation.None
})
export class MapViewComponent implements AfterViewInit {

  constructor(
    private mapService: MapService,
    private placesService: PlacesService) {
  }

  @ViewChild('map') divMap!: ElementRef;

  public map?: Map;
  
  ngAfterViewInit(): void {
    this.map = new Map({
      accessToken: environment.mapbox_key,
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.placesService.userLocation,
      zoom: 15,
      });

      const popup = new Popup()
        .setHTML(`
          <div class="popup-container">
          <h1 class="popup-title">San Francisco</h1>
          <h2 class="popup-subtitle">California</h2>
          <p class="popup-description">Es una ciudad importante de California, 
          cuarta en población del estado, decimosegunda de Estados Unidos y 
          pieza central de la Bahía de San Francisco </p>
      </div>
        `)
        .setLngLat(this.placesService.userLocation!);

      this.addMarker(this.placesService.userLocation!, popup, {draggable: true});

      this.mapService.setMap(this.map);

  }

  private addMarker(lngLat: [number, number], popup: Popup  ,options: MarkerOptions) {

    if (!this.map) {
      return;
    }
    
    const marker = new Marker({
      ...options
    })
    .setLngLat(lngLat);

    if (popup) {
      marker.setPopup(popup);
    }

    marker.addTo(this.map);
    
    if (options.draggable) {
      marker.on('drag', (ev) => {
        console.log(marker.getLngLat());
      });
    }
  }
}
