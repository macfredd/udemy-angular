import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'gifs-search-box',
  templateUrl: './search-box.component.html'
})
export class SearchBoxComponent {

@ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;

  constructor() { }

  buscar() {
    console.log(this.txtBuscar.nativeElement.value);
    this.txtBuscar.nativeElement.value = '';
  }

}
