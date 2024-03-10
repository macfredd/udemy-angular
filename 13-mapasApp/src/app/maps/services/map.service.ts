import { Injectable } from '@angular/core';
import { AnySourceData, LngLatBounds, LngLatLike, Map, Marker, Popup } from 'mapbox-gl';
import { Feature } from '../interfaces/places-response.interface';
import { DirectionsApiClient } from '../api/directions-api-client';
import { Directions, Route } from '../interfaces/directions.interface';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map: Map | undefined;
  private markers: Marker[] = [];

  constructor(private directionApiClient: DirectionsApiClient) { }

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

    try {
      this.map.fitBounds(bounds, {
        padding: 200
      });
    } catch (error) {
      console.log('Error: ', error);
    }
  }

  getRoutesBetweenPoints(start: [number, number], end: [number, number]) {
    this.directionApiClient.get<Directions>(`/${start.join(',')};${end.join(',')}`)
    .subscribe( resp => this.drawPolilyne(resp.routes[0]));
  }

  private drawPolilyne(route: Route) {
    //console.log( {kms: route.distance/ 1000, Mins: route.duration/ 60});
    
    if (!this.map) {
      throw new Error('Map not ready');
    }

    // Establecer los limites del mapa

    const coords = route.geometry.coordinates;
    const bounds = new LngLatBounds();

    coords.forEach( (coord) => {
      bounds.extend(coord as LngLatLike);
    });

    this.map.fitBounds(bounds, {
      padding:200
    });

    // Dibujar la ruta

    const anySourceData: AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coords
            }
          }
        ]
      }
    }

    // Limpiar ruta previa
    if (this.map.getLayer('RouteString')) {
      this.map.removeLayer('RouteString');
      this.map.removeSource('RouteString');
    }

    this.map.addSource('RouteString', anySourceData);

    this.map.addLayer({
      id: 'RouteString',
      type: 'line',
      source: 'RouteString',
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#3887be',
        'line-width': 3
      }
    });

  }
}
