import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent {

@ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;

  constructor() { }

  buscar() {
    console.log(this.txtBuscar.nativeElement.value);
    this.txtBuscar.nativeElement.value = '';
  }

}
