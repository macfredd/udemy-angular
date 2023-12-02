import { Component, Input } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { Personaje } from '../interfaces/dbz.interface';
import { DbzService } from '../services/dbz.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html'
})
export class AgregarComponent {

constructor(private dbzService: DbzService) {}

  @Input() nuevo: Personaje = {
    id: '',
    nombre : '',
    poder : 0
  }

  agregar() {
    if (this.nuevo.nombre.trim().length == 0) {
      return
    }

    //Generar un id unico
    this.nuevo.id = uuid();
    
    this.dbzService.agregarPersonaje(this.nuevo);

    this.nuevo = {
      id: '',
      nombre: '',
      poder: 0
    }
  }
}
