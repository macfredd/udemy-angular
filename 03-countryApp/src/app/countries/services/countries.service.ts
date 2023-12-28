import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, tap, map, of } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { cacheStorage } from '../interfaces/cache-storage.interface';
import { Regions } from '../types/regions.types';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheCountries: cacheStorage = {
    byCapital: { term: '', countries: [] },
    byCountry: { term: '', countries: [] },
    byRegion : { region: undefined, countries: [] },
  }

  constructor(private httpClient: HttpClient) {
    this.loadFromLocalStorage();
  }

  /**
   * Save cache to LocalStorage
   */
  private saveToLocalStorage() {
    localStorage.setItem('cacheCountries', JSON.stringify(this.cacheCountries));
  }

  /**
   * Load cache from LocalStorage
   */
  private loadFromLocalStorage() {
    if (localStorage.getItem('cacheCountries')) {
      this.cacheCountries = JSON.parse(localStorage.getItem('cacheCountries')!);
    }
  }

  /**
   * Search countries by Capital
   * @param term string
   * @returns Observable<Country>
   */
  searchByCapital(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${term}`;
    return this.searchCountries(term, url)
    .pipe(
      tap( (countries) => {
        this.cacheCountries.byCapital = { term, countries };
      }),
      tap( () =>
        this.saveToLocalStorage() ),
    );
  }

  /**
   * Search countries by Name
   * @param term string
   * @returns Observable<Country>
   */
  searchByName(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${term}`;
    return this.searchCountries(term, url)
    .pipe(
      tap( countries => {
        this.cacheCountries.byCountry = { term, countries };
      }),
      tap( () =>
        this.saveToLocalStorage() ),
    );
  }

  /**
   * Search countries by Region
   * @param region Region
   * @returns Observable<Country>
   */
  searchByRegion(region: Regions): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${region}`;
    return this.searchCountries(region, url)
    .pipe(
      tap( (countries) => {
        this.cacheCountries.byRegion = { region: region, countries };
      }),
      tap( () =>
        this.saveToLocalStorage() ),
    );
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
      );
  }

}
