import { Component } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { Personaje } from '../interfaces/dbz.interface';
import { DbzService } from '../services/dbz.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html'
})
export class MainPageComponent {

  constructor() {}

  nuevo: Personaje = {
    id: uuid(),
    nombre : '',
    poder : 0
  }
}
