import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent implements OnInit {

  private countries: Country[] = [];

  public isLoading: boolean = false;

  public sotoredSearchValue: string = '';

  constructor(private countryService: CountriesService) { }
  
  ngOnInit(): void {
    this.sotoredSearchValue = this.countryService.cacheCountries.byCapital.term;
    this.countries = this.countryService.cacheCountries.byCapital.countries;
  }

  public get getCountries(): Country[] {  
    return this.countries;
  }

  public searchByCapital(term: string) {
    this.isLoading = true;
    this.countryService.searchByCapital(term)
      .subscribe(
        (countries) => {
          this.countries = countries;
          this.isLoading = false;
        });
  }
}
