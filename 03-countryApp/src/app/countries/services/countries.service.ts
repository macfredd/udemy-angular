import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, delay, map, of } from 'rxjs';
import { Country } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(private httpClient: HttpClient) { }

  /**
   * Search countries by Capital
   * @param term string
   * @returns Observable<Country>
   */
  searchByCapital(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${term}`;
    return this.searchCountries(term, url);
  }

  /**
   * Search countries by Name
   * @param term string
   * @returns Observable<Country>
   */
  searchByName(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${term}`;
    return this.searchCountries(term, url);
  }

  /**
   * Search countries by Region
   * @param term string
   * @returns Observable<Country>
   */
  searchByRegion(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${term}`;
    return this.searchCountries(term, url);
  }

  /**
   * Get country by Alpha code
   * @param id string
   * @returns Observable<Country>
   */
  getCountryByAlpha(id: string): Observable<Country | null> {
    const url = `${this.apiUrl}/alpha/${id}`;
    return this.searchCountries(id, url)
    .pipe(map( (countries:
      Country[]) => countries.length > 0 ? countries[0] : null ))
  }

  /**
     * Search countries by Term and URL
     * @param term string
     * @param url string
     * @returns Observable<Country>
     */
  private searchCountries(term: string, url: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>(url)
    .pipe( 
      catchError( (err) => of([]) ),
      delay(13000),
      );
  }

}
