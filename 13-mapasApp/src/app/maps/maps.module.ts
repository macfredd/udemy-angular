import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScreenMapComponent } from './screens/screen-map/screen-map.component';
import { MapViewComponent } from './components/map-view/map-view.component';
import { LoadingComponent } from './components/loading/loading.component';
import { BtnMyLocationComponent } from './components/btn-my-location/btn-my-location.component';
import { AngularLogoComponent } from './components/angular-logo/angular-logo.component';

@NgModule({
  declarations: [
    ScreenMapComponent,
    MapViewComponent,
    LoadingComponent,
    BtnMyLocationComponent,
    AngularLogoComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ScreenMapComponent,
  ]
})
export class MapsModule { }