import { Component, OnInit } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {
  private limit: number = 12;
  private page: number = 1;

  constructor(private gifsService: GifsService) { }

  ngOnInit(): void {
  }

  public get historial() {
    return this.gifsService.historial;
  }

  private get offset() {
    return (this.page - 1) * this.limit;
  }

  public delete(index: number, item: string) {
    this.gifsService.deleteHistorial(index, item);
  }

  public buscar(termino: string) {
    this.gifsService.getGifs(termino, this.limit, this.offset);
  }

}
