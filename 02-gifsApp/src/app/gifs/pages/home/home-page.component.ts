import { Component, OnInit } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gifs.interface';

@Component({
  selector: 'gifs-home-page',
  templateUrl: './home-page.component.html',
  styles: [
  ]
})
export class HomePageComponent {

  constructor(private gifsService: GifsService) { }

  get gifs() : Gif[] {
    return this.gifsService.gifsList;
  } 

}
