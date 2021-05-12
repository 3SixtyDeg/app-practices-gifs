import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {
  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;
  @ViewChild('selectSize') selectSize!:ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) { }

  ngOnInit(): void {
  }

  buscar() {
    const value = this.txtBuscar.nativeElement.value;

    if (value.trim().length == 0) {
      return;
    }
    
    this.gifsService.setPage(1);
    this.gifsService.setSearch(value);
    this.gifsService.searchGifs();
    this.txtBuscar.nativeElement.value = '';
  }

  onSizeChange(): void {
    const value = Number(this.selectSize.nativeElement.value) || 10;
    console.log(value);
    this.gifsService.setPage(1);
    this.gifsService.setLimit(value);
    this.gifsService.searchGifs();
  } 

}
