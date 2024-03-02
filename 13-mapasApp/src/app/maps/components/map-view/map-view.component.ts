import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { PlacesService } from '../../services';
import { LngLat, Map, Marker, MarkerOptions, Popup } from 'mapbox-gl';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.css'
})
export class MapViewComponent implements AfterViewInit {

  constructor(private placesService: PlacesService) {
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
        .setHTML('<h1>Hello World!</h1>')
        .setLngLat(this.placesService.userLocation!);

      this.addMarker(this.placesService.userLocation!, popup, {draggable: true});
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
