import { Injectable } from '@angular/core';
import { CountriesResponse, Country, Region } from '../interfaces/country.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private baseUrl: string = 'https://restcountries.com/v3.1';

  constructor(private httpClient: HttpClient) { }

  private _regions: Region[] = [ 
    Region.Africa, 
    Region.Americas, 
    Region.Asia, 
    Region.Europe, 
    Region.Oceania
  ];

  get regions(): Region[] {
    return [...this._regions];
  }

  getCountriesByRegion(region: Region): Observable<CountriesResponse[]> {

    if (!region) {
      return of([]);
    }

    const url = `${this.baseUrl}/region/${region}?fields=name,cca3,borders`;

    return this.httpClient.get<Country[]>(url)
    .pipe(
      map( countries => countries.map(country => (
        {
          name: country.name.common,
          cca3: country.cca3,
          borders: country.borders ?? []
        }
      ))),
    );
  }
}
