import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToggleCasePipe } from './toggle-case/toggle-case.pipe';
import { RandomPasswordPipe } from './random-password/random-password.pipe';


@NgModule({
  declarations: [
    ToggleCasePipe,
    RandomPasswordPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ToggleCasePipe,
    RandomPasswordPipe
  ]
})
export class CustomPipesModule { }
