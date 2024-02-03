import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapsRoutingModule } from './maps-routing.module';
import { MiniMapComponent } from './components/mini-map/mini-map.component';
import { SiteMenuComponent } from './components/site-menu/site-menu.component';
import { MapsLayoutComponent } from './layout/maps-layout/maps-layout.component';
import { FullScreenPageComponent } from './pages/full-screen-page/full-screen-page.component';
import { PropertiesPageComponent } from './pages/properties-page/properties-page.component';
import { CounterAloneComponent } from '../alone/components/counter-alone/counter-alone.component';


@NgModule({
  declarations: [
    MiniMapComponent,
    SiteMenuComponent,
    MapsLayoutComponent,
    FullScreenPageComponent,
    PropertiesPageComponent,
  ],
  imports: [
    CommonModule,
    CounterAloneComponent,
    MapsRoutingModule,
  ]
})
export class MapsModule { }
