import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Gifs, Data } from '../interfaces/gifts.interfaces';



const apiKey = environment.apiKey;
@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private _historial: string[] = [];
  private _page: number = 1;
  private _limit: number = 10;
  private _search: string = '';
  public resultados: Data[] = [];

  constructor(private http: HttpClient) { 

    if (localStorage.getItem('_h')) {
      this._historial = JSON.parse(localStorage.getItem('_h')!) || [];
    }

  }

  get historial() {
    return [...this._historial];
  }

  get page() {
    return this._limit;
  }

  get limit() {
    return this._limit;
  }

  get offset() {
    return (this._page - 1) * this._limit;
  }

  setPage(page: number) {
    this._page = page;
  }

  setLimit(limit: number) {
    this._limit = limit;
  }

  setSearch(search: string) {
    this._search = search;
  }

  searchGifs() {
     const value = this._search.trim().toLowerCase();

    if (!this._historial.includes(value)) {
      this._historial.unshift(value);
      this._historial = this._historial.splice(0, 10);
      localStorage.setItem('_h', JSON.stringify(this._historial));
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const params = new HttpParams()
      .set('api_key', apiKey)
      .set('q', value)
      .set('offset', this.offset.toString())
      .set('limit', this.limit.toString());

    this.http.get<Gifs>('https://api.giphy.com/v1/gifs/search', {headers: headers, params: params})
      .subscribe((response) => {
        this.resultados = response.data;
    });
  }

}
