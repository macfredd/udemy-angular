import { AfterViewInit, Component } from '@angular/core';
import * as  mapboxgl  from 'mapbox-gl';


@Component({
  templateUrl: './full-screen-page.component.html',
  styleUrl: './full-screen-page.component.css'
})
export class FullScreenPageComponent implements AfterViewInit{

  ngAfterViewInit(): void {
    const map = new mapboxgl.Map({
      accessToken: "pk.eyJ1IjoiZnJlZGR5Y3J1emUiLCJhIjoiY2xyd21tejAxMHFmbzJpbzUzeGxmMmU0cSJ9.EJw5qNZ84LCvmRUKXz1fPQ",
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
  }
}
