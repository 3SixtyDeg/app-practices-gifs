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
  private _limit: number = 12;
  private _total: number = 0;
  private _search: string = '';
  public resultados: Data[] = [];

  constructor(private http: HttpClient) { 

    if (localStorage.getItem('_h')) {
      this._historial = JSON.parse(localStorage.getItem('_h')!) || [];
    }

    if (localStorage.getItem('_p')) {
      this._page = Number(localStorage.getItem('_p')) || 1;
    }

    if (localStorage.getItem('_l')) {
      this._limit = Number(localStorage.getItem('_l')) || 12;
    }

    if (localStorage.getItem('_s')) {
      this._search = localStorage.getItem('_s') || '';
    }

  }

  get historial() {
    return [...this._historial];
  }

  get page() {
    return this._page;
  }

  get limit() {
    return this._limit;
  }

  get offset() {
    return (this._page - 1) * this._limit;
  }

  get total() {
    return this._total;
  }

  setPage(page: number) {
    this._page = page;
    localStorage.setItem('_p', this._page.toString());
  }

  setLimit(limit: number) {
    this._limit = limit;
    localStorage.setItem('_l', this._limit.toString());
  }

  setSearch(search: string) {
    this._search = search;
    localStorage.setItem('_s', this._search);
  }

  setTotal(total: number) {
    this._total = total;
  }

  deleteHistorial(index: number, item: string) {
    const value = item.trim().toLowerCase();

    if (this._historial.includes(value)) {
      localStorage.removeItem('_s');
    }

    this._historial.splice(index, 1);
    localStorage.setItem('_h', JSON.stringify(this._historial));
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
        this.setTotal(response.pagination.total_count);
        this.resultados = response.data;
    });
  }

}
