import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Map, Marker, MarkerOptions } from 'mapbox-gl';
import { environment } from '../../../../environments/environment';

@Component({
  templateUrl: './zoom-page.component.html',
  styleUrl: './zoom-page.component.css'
})
export class ZoomPageComponent implements AfterViewInit, OnDestroy{

  @ViewChild('map') divMap?: ElementRef;

  public zoom: number = 10;

  public map!: Map;

  public currentLatLng: LngLat = new LngLat(-85.579765542208, 11.577481296026505);

  ngAfterViewInit(): void {

    if(!this.divMap) {
      return;
    }

    this.map = new Map({
      accessToken: environment.mapbox_key,
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLatLng, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    this.mapListener();

    const makerOptions = {
      color: '#FF0000',
      draggable: true,
    }
    this.addMarker(this.currentLatLng, makerOptions);
  }

  ngOnDestroy(): void {
    this.map.remove();
  }

  mapListener() {
    this.map.on('zoom', (ev) => {
      this.zoom = this.map.getZoom();
    });

    this.map.on('move', (ev) => {
      this.currentLatLng = this.map.getCenter();;
    });
  }

  addMarker(lngLat: LngLat, options: MarkerOptions) {
    const marker = new Marker({
      ...options
    })
      .setLngLat(lngLat)
      .addTo(this.map);

    if (options.draggable) {
      marker.on('drag', (ev) => {
        this.currentLatLng = marker.getLngLat();
      });
    }
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
