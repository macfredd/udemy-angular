import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interface';

/**
 * The GIPHY API key.
 * TODO: Move to environment variables.
 */
const GIPPHY_API_KEY = 'KTsjcCoEj7zWZC0vEgmQDtFd6Fegr8ta';

/**
 * The GIPHY API URL.
 */
const GIPHY_API_URL = 'https://api.giphy.com/v1/gifs';

const GIPHY_SEARCH_LIMIT = 10;

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

  public gifsList: Gif[] = [];

  constructor(private http: HttpClient) { 
    this.loadTagHistory();
  }

  get tagHistory(): string[] {
    return [...this._tagHistory];
  }

  /**
   * Organize the tag history.
   */
  private OrganizeTagHistory(tag: string): void {
    if (this._tagHistory.includes(tag)) {
      this._tagHistory = this._tagHistory.filter( OldTag => OldTag !== tag);
    }

    this._tagHistory.unshift(tag);
    this._tagHistory = this._tagHistory.splice(0, this._totalResults);
    this.saveTagHistory();
  }

  /**
   * Save the tag history to the local storage.
   */
  private saveTagHistory(): void {
    localStorage.setItem('history', JSON.stringify(this._tagHistory));
  }

  /**
   * Load the tag history from the local storage.
   */
  private loadTagHistory(): void {
    const history = localStorage.getItem('history');
    if (history) {
      this._tagHistory = JSON.parse(history);
      if (this._tagHistory.length > 0)
        this.searchGifs(this._tagHistory[0]);
    }
  }

  /**
   * Search gifs by tag.
   * @param tag The tag.
   */
  public searchGifs(tag: string): void {
    tag = tag.trim().toLowerCase();
    if (tag.trim().length === 0 ) return;
    this.OrganizeTagHistory(tag);

    const params = new HttpParams()
      .set('api_key', GIPPHY_API_KEY)
      .set('q', tag)
      .set('limit', GIPHY_SEARCH_LIMIT.toString());

    this.http.get<SearchResponse>(`${GIPHY_API_URL}/search`, { params })
    .subscribe( (response) => {
      this.gifsList = response.data;
    });
  }

  /**
   * Delete a tag from the tag history.
   * @param tag The tag.
   */
  public deleteTag(tag: string): void {
    this._tagHistory = this._tagHistory.filter( OldTag => OldTag !== tag);
    this.saveTagHistory();

    if (this._tagHistory.length > 0)
      this.searchGifs(this._tagHistory[0]);
    else 
      this.gifsList = [];
  }
}
