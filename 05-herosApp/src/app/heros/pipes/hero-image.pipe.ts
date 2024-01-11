import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heros.interface';

@Pipe({
  name: 'heroImage'
})
export class HeroImagePipe implements PipeTransform {

  transform(hero: Heroe): string {

    if (!hero.id && !hero.alt_img) {
      return 'assets/no-image.png';
    }

    debugger;
    if (hero.alt_img) {
      return hero.alt_img;
    }
    return `assets/heros/${hero.id}.jpg`;
  }
}
