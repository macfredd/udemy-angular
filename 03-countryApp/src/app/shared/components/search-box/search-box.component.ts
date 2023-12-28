import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  
  
  private debouncer: Subject<string> = new Subject();

  @Input() public placeholder: string = 'Search...';

  @Input() public sotoredSearchValue: string = '';

  @ViewChild('txtSearchInput') txtSearchInput!: ElementRef<HTMLInputElement>;

  @Output() onNewSearch: EventEmitter<string> = new EventEmitter();

  ngOnInit(): void {
    this.debouncer
    .pipe(
      debounceTime(300)
    )
    .subscribe( value => {
      this.searchBy();
    });
  }

  ngOnDestroy(): void {
    this.debouncer.unsubscribe();
  }
  

  public searchBy() {
    if (this.txtSearchInput.nativeElement.value.length == 0) 
      return;

    this.onNewSearch.emit(this.txtSearchInput.nativeElement.value);
  }

  public onKeyPress(event: any) {
    this.debouncer.next(this.txtSearchInput.nativeElement.value);
  }
}
