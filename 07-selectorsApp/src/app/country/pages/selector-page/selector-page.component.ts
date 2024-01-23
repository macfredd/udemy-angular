import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { CountriesResponse } from '../../interfaces/country.interface';

@Component({
  selector: 'country-selector-page',
  templateUrl: './selector-page.component.html',
  styleUrl: './selector-page.component.css'
})
export class SelectorPageComponent implements OnInit{

  public countries: CountriesResponse[] = [];

  constructor(private formBuilder: FormBuilder,
    private countriesServices: CountriesService) { }
  
  ngOnInit(): void {
    this.onRegionChange();
  }
    
  public form: FormGroup = this.formBuilder.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    borders: ['', Validators.required]
  });

  get Regions() {
    return this.countriesServices.regions;
  }

  onRegionChange(): void {
    this.form.get('region')?.valueChanges
    .pipe(
      switchMap(region => this.countriesServices.getCountriesByRegion(region))
    ).subscribe(countries => {
      this.countries = countries;
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
