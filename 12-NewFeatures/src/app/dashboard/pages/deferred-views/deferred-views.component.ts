import { Component } from '@angular/core';
import { HeavyLoadersSlowComponent } from '@shared/heavy-loaders/heavy-loaders-slow.component';
import { TitlesComponent } from '@shared/titles/titles.component';

@Component({
  standalone: true,
  imports: [TitlesComponent, HeavyLoadersSlowComponent],
  templateUrl: './deferred-views.component.html',
  styleUrl: './deferred-views.component.css'
})
export class DeferredViewsComponent {

}
