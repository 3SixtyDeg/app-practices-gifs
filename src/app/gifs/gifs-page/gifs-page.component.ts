import { Component, OnInit } from '@angular/core';
import { GifsService } from '../services/gifs.service';
import { Gifs, Pagination } from '../interfaces/gifts.interfaces';



@Component({
  selector: 'app-gifs-page',
  templateUrl: './gifs-page.component.html',
  styles: [
  ]
})
export class GifsPageComponent implements OnInit {
  public pagination!: Pagination;
  public limit: number = 12;
  private termino: string = this.gifsService.termino;
  public page: number = 1;

  constructor(private gifsService: GifsService) { }

  ngOnInit(): void {
  }

  public get offset() {
    return (this.page - 1) * this.limit;
  }

  public setSize(size: number) {
    this.limit = size;
    this.page = 1;
    this.buscar();
  }

  public setSearch(termino: string) {
    this.termino = termino;
    this.page = 1;
    this.buscar();
  }

  public setPage(page: number) {
    this.page = page;
    this.buscar();
  }

  public buscar() {
    this.gifsService.getGifs(this.termino, this.limit, this.offset);
  }

}
