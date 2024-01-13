import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { ConfirmComponent } from './components/dialogs/confirm/confirm.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    Error404PageComponent,
    ConfirmComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    Error404PageComponent,
    ConfirmComponent
  ]
})
export class SharedModule { }
