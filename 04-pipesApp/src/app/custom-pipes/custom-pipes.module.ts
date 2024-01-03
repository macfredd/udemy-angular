import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToggleCasePipe } from './toggle-case/toggle-case.pipe';


@NgModule({
  declarations: [
    ToggleCasePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ToggleCasePipe
  ]
})
export class CustomPipesModule { }
