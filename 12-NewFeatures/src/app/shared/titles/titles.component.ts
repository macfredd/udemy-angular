import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-titles',
  standalone: true,
  imports: [],
  templateUrl: './titles.component.html',
  styleUrl: './titles.component.css'
})
export class TitlesComponent {

  @Input({required: true}) title!:string;

}
