import { AfterViewInit, Component, Input } from '@angular/core';
import * as leaflet from 'leaflet';
import { CountryMap } from '../../../countries/interfaces/country.interface';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'shared-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent  implements AfterViewInit{
  
  @Input() public countries!: CountryMap[];

  private map!: leaflet.Map;

  private initMap(): void {

    if (!this.countries) {
      return;
    }

    var lat = this.countries[0].latlng[0];
    var lng = this.countries[0].latlng[1];

    this.map = leaflet.map('map', {
      center: [ lat, lng ],
      zoom: 5
    });

    const tiles = leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    this.loadGeoJson(this.countries[0].cca3);
  }

  constructor(private httpClient: HttpClient) { }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private loadGeoJson(countryCode: string): void {
    const geoJsonUrl = `../../assets/geojsonfiles/${countryCode}.geojson`;

    this.httpClient.get(geoJsonUrl).subscribe((geoJson: any) => {
      const geoJsonLayer = leaflet.geoJSON(geoJson);
      geoJsonLayer.addTo(this.map);
    });
  }
}
