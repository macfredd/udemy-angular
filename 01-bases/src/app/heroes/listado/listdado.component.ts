import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html'
})
export class ListadoComponent {

  heroeBorrado: string  = '';

  heroes: string[] = [
    'Spiderman',
    'Superman',
    'Hulk',
    'Ironman'];

    heroesCopia: string [] = Object.values(this.heroes);

    borrarElemento() {
      this.heroeBorrado = this.heroes.shift() || '';
    }

    reiniciarLista() {
      this.heroeBorrado = '';
      this.heroes = Object.values(this.heroesCopia);
    }
}

