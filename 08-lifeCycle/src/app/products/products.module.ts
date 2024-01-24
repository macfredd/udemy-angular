import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { PriceComponent } from './components/price/price.component';
import { ProductComponent } from './pages/product/product.component';

@NgModule({
  declarations: [
    PriceComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule
  ],
  exports: [
    PriceComponent,
    ProductComponent
  ]
})
export class ProductsModule { }