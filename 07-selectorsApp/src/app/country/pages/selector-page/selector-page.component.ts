import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { filter, switchMap, tap } from 'rxjs';
import { CountriesResponse } from '../../interfaces/country.interface';

@Component({
  selector: 'country-selector-page',
  templateUrl: './selector-page.component.html',
  styleUrl: './selector-page.component.css'
})
export class SelectorPageComponent implements OnInit{

  public countries: CountriesResponse[] = [];

  public borders: CountriesResponse[] = [];

  constructor(private formBuilder: FormBuilder,
    private countriesServices: CountriesService) { }
  
  ngOnInit(): void {
    this.onRegionChange();
    this.onCountryChange();
  }
    
  public form: FormGroup = this.formBuilder.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required]
  });

  get Regions() {
    return this.countriesServices.regions;
  }

  onRegionChange(): void {
    this.form.get('region')?.valueChanges
    .pipe(
      tap(() => this.form.get('country')?.reset('')),
      tap(() => this.countries = []),
      filter(region => region !== ''),
      switchMap(region => this.countriesServices.getCountriesByRegion(region))
    ).subscribe(countries => {
      this.countries = countries;
    });
  }

  onCountryChange(): void {
    this.form.get('country')?.valueChanges
    .pipe(
      tap(() => this.form.get('border')?.reset('')),
      tap(() => this.borders = []),
      filter(code => code !== ''),
      switchMap(code => this.countriesServices.getCountryByCode(code)),
      switchMap(country => this.countriesServices.getCountryBordersByCode(country?.borders || []))
    ).subscribe(countryResponse => {
      this.borders = countryResponse || [];
    });
  }

  public onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    
    console.log(this.form.value);
  }
}
