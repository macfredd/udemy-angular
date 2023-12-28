import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';
import { Regions } from '../../types/regions.types';

@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent implements OnInit {

  private countries: Country[] = [];

  public regions: Regions[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];

  public isLoading: boolean = false;

  public activeRegion?: Regions;

  constructor(private countryService: CountriesService) { }
  
  ngOnInit(): void {
    this.countries = this.countryService.cacheCountries.byRegion.countries;
    this.activeRegion = this.countryService.cacheCountries.byRegion.region;
  }

  public get getCountries(): Country[] {  
    return this.countries;
  }

  public searchByRegion(region: Regions) {
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
