import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Feature, PlacesResponse } from '../interfaces/places-response.interface';
import { PlacesApiClient } from '../api';



@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public userLocation: [number, number] | undefined = undefined
  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];

  get isUserLocationReady(): boolean {
    return !! this.userLocation;
  }

  constructor(private placesApiClient: PlacesApiClient) { 
    this.getUserLocation();
  }

  public async getUserLocation(): Promise<[number, number]> {
    return new Promise( (resolve, reject) => {
       navigator.geolocation.getCurrentPosition(
        ({coords}) => {
          this.userLocation = [ coords.longitude, coords.latitude]
          resolve(this.userLocation);
        },
        (error) => {
          alert(error);
          reject();
        });
    });
  }

  public getPlaces(query: string) {

    this.isLoadingPlaces = true;

    if (!this.userLocation) {
      throw new Error('User location not found');
    }

    const params = {
      proximity: this.userLocation.join(','),
    };
    
    this.placesApiClient.get<PlacesResponse>(`/${query}.json`, 
    {
      params,
    })
    .subscribe( (response) => {
      this.places = response.features;
      this.isLoadingPlaces = false;
    });
  }
}
