import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScreenMapComponent } from './screens/screen-map/screen-map.component';



@NgModule({
  declarations: [
    ScreenMapComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ScreenMapComponent
  ]
})
export class MapsModule { }
