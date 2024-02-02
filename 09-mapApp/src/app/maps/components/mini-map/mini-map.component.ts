import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'app-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css'
})
export class MiniMapComponent {

  @Input() public lngLat: [number, number] = [0, 0];
  @ViewChild('map') divMap?: ElementRef;
  
  public map!: Map;

  ngAfterViewInit(): void {

    if(!this.divMap || !this.lngLat) {
      return;
    }

    this.map = new Map({
      accessToken: environment.mapbox_key,
      container: this.divMap.nativeElement, 
      style: 'mapbox://styles/mapbox/streets-v12', 
      center: this.lngLat, 
      zoom: 12,
      interactive: false
    });

    new Marker().setLngLat(this.lngLat).addTo(this.map);
  }

}
