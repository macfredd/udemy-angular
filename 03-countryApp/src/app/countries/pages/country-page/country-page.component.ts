import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country.interface';

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
      this.isLoading = false;
    });
  }
}