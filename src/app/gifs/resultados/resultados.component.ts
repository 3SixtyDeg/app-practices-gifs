import { Component, OnInit } from '@angular/core';
import { GifsService } from '../services/gifs.service';
import { Data } from '../interfaces/gifts.interfaces';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styles: [
  ]
})
export class ResultadosComponent implements OnInit {
  public loading: boolean = false;

  constructor(private gifsService: GifsService) { }

  ngOnInit(): void {
  }

  get resultados(): Data[] {
    return this.gifsService.resultados;
  }

  get page(): number {
    return this.gifsService.page;
  }

  get limit(): number {
    return this.gifsService.limit;
  }

  get total(): number {
    return this.gifsService.total;
  }

  get offset(): number {
    return this.gifsService.offset;
  }

  get showing(): number {
    return (this.total > 0) ? (this.offset + 1) : this.offset;
  }

  get showingTotal(): number {
    return (this.offset + this.resultados.length);
  }

  onDataChange(page: number) {
    this.loading = true;
    this.gifsService.setPage(page);
    this.gifsService.searchGifs();
  }  

}
