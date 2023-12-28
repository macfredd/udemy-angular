import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

type regions = 'africa' | 'americas' | 'asia' | 'europe' | 'oceania';

@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent {

  private countries: Country[] = [];

  public regions: regions[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];

  public isLoading: boolean = false;

  public activeRegion?: regions;

  constructor(private countryService: CountriesService) { }

  public get getCountries(): Country[] {  
    return this.countries;
  }

  public searchByRegion(region: regions) {
    this.isLoading = true;
    this.activeRegion = region;
    this.countryService.searchByRegion(region)
      .subscribe(
        (countries) => {
          this.countries = countries;
          this.isLoading = false;
        });
  }
}
