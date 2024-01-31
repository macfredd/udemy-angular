import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LngLat, Map, Marker, MarkerOptions } from 'mapbox-gl';
import { environment } from '../../../../environments/environment';

export interface MarkerInfo {
  marker: Marker;
  color: string;
  visible: boolean;
}

@Component({
  templateUrl: './zoom-page.component.html',
  styleUrl: './zoom-page.component.css'
})
export class ZoomPageComponent implements OnInit, AfterViewInit, OnDestroy{

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
      marker.on('drag', (ev) => {
        this.currentLatLng = marker.getLngLat();
      });
    }

    this.markersList.push({marker, color, visible: true});
  }

  removerMarker(index: number) {
    const marker = this.markersList[index];
    marker.marker.remove();
    this.markersList.splice(index, 1);
  }

  flyToMarker(index: number) {
    const marker = this.markersList[index];
    this.map.flyTo({
      center: marker.marker.getLngLat()
    });
  }

  toggleMarker(index: number) {
    this.markersList[index].visible = !this.markersList[index].visible;
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
}
