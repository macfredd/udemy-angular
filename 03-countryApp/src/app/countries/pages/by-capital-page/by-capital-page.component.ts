import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent {

  private countries: Country[] = [];

  constructor(private countryService: CountriesService) { }

  public get getCountries(): Country[] {  
    return this.countries;
  }

  public searchByCapital(term: string) {
    this.countryService.searchByCapital(term)
      .subscribe(
        (countries) => {
          this.countries = countries;
        });
  }
}
