import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SahredSidebarComponent } from './components/sidebar/sidebar.component';



@NgModule({
  declarations: [
    SahredSidebarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SahredSidebarComponent
  ]
})
export class SharedModule { }
