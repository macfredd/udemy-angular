import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'randomPassword'
})
export class RandomPasswordPipe implements PipeTransform {

  private symbols = "~`!@#$%^&*()/|:;.,+-*"
  private alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  transform(value: string, ...args: unknown[]): string {
    const [length, allowNumbers, allowSpecial] = args as [number, boolean, boolean];

    let randomNumber = '';
    if (allowNumbers) {
      randomNumber = this.generateRandomNumber();
    }

    let randomSpecialChars = '';
    if (allowSpecial) {
      randomSpecialChars = this.generateRandomString(Math.floor(length / 2) , this.symbols);
    }

    let characters: string[] = value.split("")
    .concat(randomNumber.split(""))
    .concat(randomSpecialChars.split(""));

   
    let refill = '';
    if (characters.length < length) {
      refill = this.generateRandomString(length - characters.length, this.alphabet);
    }

    characters = characters.concat(refill.split(""));
    return this.shuffleArray(characters).join("").slice(0,length);
  }

  private generateRandomNumber(): string {
    return (Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000).toString();
  }

  private generateRandomString(length: number, charset: string): string {
    let returnString = '';
    for (let i = 0; i < length; i++) {
      const indiceAleatorio = Math.floor(Math.random() * charset.length);
      returnString += charset.charAt(indiceAleatorio);
    }
    return returnString;
  }

  private shuffleArray(array: string[]): string[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
