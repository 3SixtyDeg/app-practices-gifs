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
  public total = 100;
  public showing = 0;
  public showingTotal = 0;

  constructor(private gifsService: GifsService) { }

  ngOnInit(): void {
  }

  get resultados(): Data[] {
    return this.gifsService.resultados;
  }

  onTableDataChange(page: number) {
    this.gifsService.setPage(page);
    this.gifsService.setLimit(10);
    localStorage.setItem('_p', page.toString());
    this.gifsService.searchGifs();
  }  

  onTableSizeChange(): void {
    this.gifsService.setPage(1);
    this.gifsService.setLimit(10);
    localStorage.setItem('_p', '1');
    this.gifsService.searchGifs();
  } 

  get page(): number {
    return this.gifsService.page;
  }

  get limit(): number {
    return this.gifsService.limit;
  }

}
