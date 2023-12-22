import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent {

  @Input() public placeholder: string = 'Search...';

  @ViewChild('txtSearchInput') txtSearchInput!: ElementRef<HTMLInputElement>;

  @Output() onNewSearch: EventEmitter<string> = new EventEmitter();

  public searchBy() {
    if (this.txtSearchInput.nativeElement.value.length == 0) 
      return;

    this.onNewSearch.emit(this.txtSearchInput.nativeElement.value);
  }
}
