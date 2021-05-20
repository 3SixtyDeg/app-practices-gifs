import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Gifs } from '../interfaces/gifts.interfaces';
import { GifsService } from '../services/gifs.service';



@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styles: [
  ]
})
export class ResultadosComponent implements OnInit {
  @Input() limit!: number;
  @Input() page!: number;
  @Input() offset!: number;
  @Output() pageEmit: EventEmitter<number> = new EventEmitter();

  constructor(private gifsService: GifsService) { }

  ngOnInit(): void {
  }

  public get gifs() {
    return this.gifsService.resultados;
  }

  public get totalCount() {
    return this.gifsService.totalCount;
  }

  private get count() {
    return this.gifsService.count;
  }

  public get showing(): number {
    return (this.totalCount > 0) ? (this.offset + 1) : this.offset;
  }

  public get showingTotal(): number {
    return (this.offset + this.count);
  }

  public onDataChange(page: number) {
    this.pageEmit.emit(page);
  }

}
