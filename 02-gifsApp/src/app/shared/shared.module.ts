import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SahredSidebarComponent } from './components/sidebar/sidebar.component';
import { LazyImageComponent } from './components/lazy-image/lazy-image.component';

@NgModule({
  declarations: [
    SahredSidebarComponent,
    LazyImageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SahredSidebarComponent,
    LazyImageComponent
  ]
})
export class SharedModule { }
