import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country, CountryMap } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-country-page',
  templateUrl: './country-page.component.html',
  styleUrl: './country-page.component.css',
})
export class CountryPageComponent  implements OnInit{
[x: string]: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private countriesService: CountriesService,
    private router: Router ) { }

  public country?: Country;

  public countryMap: CountryMap[] = [];

  public isLoading: boolean = false;

  ngOnInit(): void {
    this.isLoading = true;
    this.activatedRoute.params
    .pipe(switchMap( ({ id }) => this.countriesService.getCountryByAlpha(id)))
    .subscribe( country => {
      if (!country) {
        this.router.navigateByUrl('/countries');
        return;
      }

      this.country = country;
      this.countryMap = [this.CountryMapMapper(country)];
      this.isLoading = false;
    });
  }

  private CountryMapMapper(country: Country): CountryMap {
    return {
      name: country.name.common,
      cca2: country.cca2,
      ccn3: country.ccn3,
      cca3: country.cca3,
      cioc: country.cioc,
      latlng: country.latlng,
      maps: country.maps,
    }
  }
}