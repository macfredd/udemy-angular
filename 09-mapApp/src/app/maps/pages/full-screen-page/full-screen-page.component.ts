import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LngLat, Map, Marker, MarkerOptions } from 'mapbox-gl';
import { environment } from '../../../../environments/environment';

export interface MarkerInfo {
  marker: Marker;
  color: string;
}

export interface PlainMarker {
  lng: number;
  lat: number;
  color: string;
}

@Component({
  templateUrl: './full-screen-page.component.html',
  styleUrl: './full-screen-page.component.css'
})
export class FullScreenPageComponent implements OnInit, AfterViewInit, OnDestroy{

  @ViewChild('map') divMap?: ElementRef;

  public zoom: number = 10;

  public map!: Map;

  public currentLatLng: LngLat = new LngLat(-85.579765542208, 11.577481296026505);

  private markersList: MarkerInfo[] = [];

  ngOnInit(): void {
    
  }
  
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

    this.loadFromLocalStorage();
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

    const color = options.color || 
      '#' + Math.floor(Math.random() * 16777215).toString(16);
    
      const marker = new Marker({
      ...options,
      color
    })
      .setLngLat(lngLat)
      .addTo(this.map);
    
    if (options.draggable) {
      marker.on('dragend', (ev) => {
        this.saveToLocalStorage();
      });
    }

    this.markersList.push({marker, color});
    this.saveToLocalStorage();
  }

  removerMarker(index: number) {
    const marker = this.markersList[index];
    marker.marker.remove();
    this.markersList.splice(index, 1);
    this.saveToLocalStorage();
  }

  flyToMarker(index: number) {
    const marker = this.markersList[index];
    this.map.flyTo({
      center: marker.marker.getLngLat()
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
  
  onAddNewMarker() {
    const makerOptions = {
      draggable: true,
    }
    this.addMarker(this.map.getCenter(), makerOptions);
  }

  get markers(): MarkerInfo[]{
    return [...this.markersList]
  }

  saveToLocalStorage() {
    const plainMarkers: PlainMarker[] = this.markersList.map((marker) => {
      return {
        lng: marker.marker.getLngLat().lng,
        lat: marker.marker.getLngLat().lat,
        color: marker.color
      }
    });

    localStorage.setItem('plainmarkers', JSON.stringify(plainMarkers));
  }

  loadFromLocalStorage() {
    const plainMarkers = localStorage.getItem('plainmarkers');
    if (!plainMarkers) {
      return;
    }

    const markers: PlainMarker[] = JSON.parse(plainMarkers);
    markers.forEach((marker) => {
      const lngLat = new LngLat(marker.lng, marker.lat);
      const markerOptions = {
        color: marker.color,
        draggable: true
      }
      this.addMarker(lngLat, markerOptions);
    });
  }
}
