import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent implements OnInit {

  private countries: Country[] = [];

  public sotoredSearchValue: string = '';

  public isLoading: boolean = false;

  constructor(private countryService: CountriesService) { }
  
  ngOnInit(): void {
    this.countries = this.countryService.cacheCountries.byCountry.countries;
    this.sotoredSearchValue = this.countryService.cacheCountries.byCountry.term;
  }

  public get getCountries(): Country[] {  
    return this.countries;
  }

  public searchByName(term: string) {
    this.isLoading = true;
    this.countryService.searchByName(term)
      .subscribe(
        (countries) => {
          this.countries = countries;
          this.isLoading = false;
        });
  }
}
