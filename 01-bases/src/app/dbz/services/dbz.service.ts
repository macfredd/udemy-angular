import { Injectable } from "@angular/core";
import { v4 as uuid } from "uuid";
import { Personaje } from "../interfaces/dbz.interface";

@Injectable()
export class DbzService {

  private _personajes: Personaje[] =
  [
    {
      id: uuid(),
      nombre: 'Goku',
      poder: 15000
    },
    {
      id: uuid(),
      nombre: 'Vegeta',
      poder: 7500
    },
    {
      id: uuid(),
      nombre: 'Blade',
      poder: 8600
    },
    {
      id: uuid(),
      nombre: 'Messi',
      poder: 21000
    },
    
  ];

  get personajes(): Personaje[] {
    return [...this._personajes];
  }

  agregarPersonaje(personaje: Personaje) {
    this._personajes.push(personaje);
  }

  eliminarPersonaje( index: number ) {
    this._personajes.splice(index, 1);
  }

}