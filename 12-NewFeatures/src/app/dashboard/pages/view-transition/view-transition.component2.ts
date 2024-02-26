import { Component } from '@angular/core';
import { TitlesComponent } from '@shared/titles/titles.component';

@Component({
  standalone: true,
  imports: [TitlesComponent],
  template: `
    <app-titles title="View Transition 2"></app-titles>

    <section class="flex justify-end">
      <img srcset="https://picsum.photos/id/237/200/300" alt="Picsum" width="200" height="300"
      style="view-transition-name: image1;"/>
      <div class="bg-blue-500 w-56 h-56" style="view-transition-name: div1;"></div>
    </section>
  `,
})
export class ViewTransitionComponent2 {

}
