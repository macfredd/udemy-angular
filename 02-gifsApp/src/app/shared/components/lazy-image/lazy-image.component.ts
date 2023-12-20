  import { Component, Input, OnInit } from '@angular/core';

  @Component({
    selector: 'shared-lazy-image',
    templateUrl: './lazy-image.component.html',
    styleUrls: ['./lazy-image.component.css'],
  })
  export class LazyImageComponent implements OnInit {

    constructor() { }

    @Input() src!: string;
    @Input() alt: string = '';

    public hasLoaded: boolean = false;

    ngOnInit(): void {
      if (!this.src) {
        throw new Error('Attribute src is required');
      }
    } 

    onLoad() {
      this.hasLoaded = true;
    }
  }
