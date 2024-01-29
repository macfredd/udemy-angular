import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map } from 'mapbox-gl';
import { environment } from '../../../../environments/environment';

@Component({
  templateUrl: './zoom-page.component.html',
  styleUrl: './zoom-page.component.css'
})
export class ZoomPageComponent implements AfterViewInit{

  @ViewChild('map') divMap?: ElementRef;

  public zoom: number = 10;

  public map!: Map;

  ngAfterViewInit(): void {

    if(!this.divMap) {
      return;
    }

    this.map = new Map({
      accessToken: environment.mapbox_key,
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    this.mapListener();
  }

  mapListener() {
    this.map.on('zoom', (ev) => {
      this.zoom = this.map.getZoom();
    });
  }

  OnRangeChange(event: any) {
    this.map.setZoom(event.target.value);
  }

  zoomIn() {
    this.map.zoomIn();
  }

  zoomOut() {
    this.map.zoomOut();
  }
  
}
