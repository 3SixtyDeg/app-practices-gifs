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
  public resultados: Data[] = [];

  constructor(private http: HttpClient) { 

    if (localStorage.getItem('_h')) {
      this._historial = JSON.parse(localStorage.getItem('_h')!) || [];
    }

  }

  get historial() {
    return [...this._historial];
  }

  searchGifs(value: string, limit?: number, offset?: number) {
     value = value.trim().toLowerCase();

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
      .set('offset', '1')
      .set('limit', '20');

    this.http.get<Gifs>('https://api.giphy.com/v1/gifs/search', {headers: headers, params: params})
      .subscribe((response) => {
        this.resultados = response.data;
    });
  }

}
