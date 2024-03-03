import { Injectable } from '@angular/core';
import { LngLatBounds, LngLatLike, Map, Marker, Popup } from 'mapbox-gl';
import { Feature } from '../interfaces/places-response.interface';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map: Map | undefined;
  private markers: Marker[] = [];

  isMapReady(): boolean {
    return !!this.map;
  }

  setMap(map: Map) {
    this.map = map;
  }

  flyTo(coords: LngLatLike) {
    this.map?.flyTo({ center: coords });
  }

  createMarkersFromPlaces(places: Feature[], userCurrentLocation: LngLatLike) {

    if (!this.map) {
      throw new Error('Map not ready');
    }

    this.markers.forEach( (marker) => marker.remove() );

    this.markers = places.map( (place) => {
      const marker = new Marker()
        .setLngLat([place.geometry.coordinates[0], place.geometry.coordinates[1]])
        .setPopup(new Popup().setHTML(`
          <h3>${place.text}</h3>
          <p>${place.properties.address}</p>
        `))
        .addTo(this.map!);
      return marker;
    });

    if (this.markers.length === 0) {
      return;
    }

    const bounds = new LngLatBounds();
    this.markers.forEach( (marker) => { bounds.extend(marker.getLngLat()) });

    bounds.extend(userCurrentLocation);

    this.map.fitBounds(bounds, {
      padding:200
    });
  }
}
