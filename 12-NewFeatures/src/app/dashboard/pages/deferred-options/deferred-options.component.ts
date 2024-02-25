import { Component } from '@angular/core';
import { HeavyLoadersFastComponent } from '@shared/heavy-loaders/heavy-loaders-fast.component';
import { TitlesComponent } from '@shared/titles/titles.component';

@Component({
  standalone: true,
  imports: [HeavyLoadersFastComponent, TitlesComponent],
  templateUrl: './deferred-options.component.html',
  styleUrl: './deferred-options.component.css'
})
export class DeferredOptionsComponent {

}
