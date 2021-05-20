import { Component, OnInit } from '@angular/core';
import { GifsService } from '../services/gifs.service';
import { Pagination } from '../interfaces/gifts.interfaces';



@Component({
  selector: 'app-gifs-page',
  templateUrl: './gifs-page.component.html',
  styles: [
  ]
})
export class GifsPageComponent implements OnInit {
  public pagination!: Pagination;
  public limit: number = 12;
  private termino: string = '';
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
    this.page = 1;
    this.gifsService.setTermino(termino);
    this.buscar();
  }

  public setPage(page: number) {
    this.page = page;
    this.buscar();
  }

  public buscar() {
    this.gifsService.getGifs(this.limit, this.offset);
  }

}
