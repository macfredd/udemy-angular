import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { BasicsPageComponent } from './pages/basics-page/basics-page.component';
import { NumbersPageComponent } from './pages/numbers-page/numbers-page.component';
import { UncommonPageComponent } from './pages/uncommon-page/uncommon-page.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { CustomsPageComponent } from './pages/customs-page/customs-page.component';
import { CustomPipesModule } from '../custom-pipes/custom-pipes.module';
import { TablesPageComponent } from './pages/tables-page/tables-page.component';
import { SortByPipe } from './pipes/sort-by.pipe';


@NgModule({
  declarations: [
    BasicsPageComponent,
    NumbersPageComponent,
    UncommonPageComponent,
    CustomsPageComponent,
    TablesPageComponent,

    // Local Pipes
    SortByPipe
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    PrimeNgModule,
    CustomPipesModule
  ]
})
export class ProductsModule { }
