import { Component } from '@angular/core';
import { CounterAloneComponent } from '../../components/counter-alone/counter-alone.component';
import { SiteMenuComponent } from '../../site-menu/site-menu.component';

@Component({
  selector: 'app-alone-page',
  standalone: true,
  imports: [CounterAloneComponent, SiteMenuComponent],
  templateUrl: './alone-page.component.html',
  styleUrl: './alone-page.component.css'
})
export class AlonePageComponent {

}
