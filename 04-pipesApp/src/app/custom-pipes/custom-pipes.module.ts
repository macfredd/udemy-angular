import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToggleCasePipe } from './toggle-case/toggle-case.pipe';
import { RandomPasswordPipe } from './random-password/random-password.pipe';
import { BooleanConverterPipe } from './boolean-converter/boolean-converter.pipe';


@NgModule({
  declarations: [
    ToggleCasePipe,
    RandomPasswordPipe,
    BooleanConverterPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ToggleCasePipe,
    RandomPasswordPipe,
    BooleanConverterPipe
  ]
})
export class CustomPipesModule { }
