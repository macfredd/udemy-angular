import { Component } from '@angular/core';

@Component({
  selector: 'products-basics-page',
  templateUrl: './basics-page.component.html',
  styleUrl: './basics-page.component.css'
})
export class BasicsPageComponent {

  public name: string = 'fReddY cRuz'

  public customDate: Date = new Date();
}
