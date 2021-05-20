import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Gifs, Data } from '../interfaces/gifts.interfaces';



const apiKey = environment.apiKey;
@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiUrl: string = environment.apiUrl;
  private _historial: string[] = [];
  public resultados: Data[] = [];
  public totalCount: number = 0;
  public count: number = 0;
  public termino: string = '';

  constructor(private http: HttpClient) { 

    if (localStorage.getItem('_h')) {
      this._historial = JSON.parse(localStorage.getItem('_h')!) || [];
    }
    
  }

  public get historial() {
    return [...this._historial];
  }

  public deleteHistorial(index: number, item: string) {
    const value = item.trim().toLowerCase();

    if (this._historial.includes(value)) {
      localStorage.removeItem('_s');
    }

    this._historial.splice(index, 1);
    localStorage.setItem('_h', JSON.stringify(this._historial));
  }

  public getGifs(termino: string, limit: number, offset: number) {
    this.termino = termino;

    if (!this._historial.includes(termino)) {
      this._historial.unshift(termino);
      this._historial = this._historial.splice(0, 10);
      localStorage.setItem('_h', JSON.stringify(this._historial));
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const params = new HttpParams()
      .set('api_key', apiKey)
      .set('q', termino)
      .set('offset', offset.toString())
      .set('limit', limit.toString());

    this.http.get<Gifs>(this.apiUrl, {headers: headers, params: params})
      .subscribe((response) => {
        this.resultados = response.data;
        this.totalCount = response.pagination.total_count;
        this.count = response.pagination.count;
      }, (error) => {
        this.resultados = [];
      });

  }

}
