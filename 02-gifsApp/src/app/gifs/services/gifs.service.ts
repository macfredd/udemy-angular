import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  /**
   * The tag history.
   */
  private _tagHistory: string[] = [];

  /**
   * The maximum number of elements in the tag history.
   */
  private _totalResults: number = 10;

  constructor() { }

  get tagHistory(): string[] {
    return [...this._tagHistory];
  }

  /**
   * Search gifs by tag.
   * @param tag The tag.
   */
  public searchGifs(tag: string): void {
    tag = tag.trim().toLowerCase();
    if (tag.trim().length && !this._tagHistory.includes(tag)) {
      this._tagHistory.unshift(tag);
      this._tagHistory = this._tagHistory.splice(0, this._totalResults);
    }
  }
}
