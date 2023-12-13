import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  templateUrl: './search-box.component.html'
})
export class SearchBoxComponent {

@ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService ) { }

  buscar() {
    const newTag = this.txtBuscar.nativeElement.value.trim().toLowerCase();
    this.gifsService.searchGifs(newTag);
    this.txtBuscar.nativeElement.value = '';
  }
}
