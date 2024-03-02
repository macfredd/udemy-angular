import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScreenMapComponent } from './screens/screen-map/screen-map.component';
import { MapViewComponent } from './components/map-view/map-view.component';
import { LoadingComponent } from './components/loading/loading.component';



@NgModule({
  declarations: [
    ScreenMapComponent,
    MapViewComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ScreenMapComponent
  ]
})
export class MapsModule { }
