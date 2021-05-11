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
  public page = 1;
  public pageSize = 10;
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
    this.page = page;
    localStorage.setItem('_p', page.toString());
  }  

  onTableSizeChange(): void {
    this.page = 1;
    localStorage.setItem('_p', '1');
  } 

}
