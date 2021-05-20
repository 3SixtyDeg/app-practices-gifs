import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {
  @Output() sizeEmit: EventEmitter<number> = new EventEmitter();
  @Output() searchEmit: EventEmitter<string> = new EventEmitter();

  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;
  @ViewChild('selectSize') selectSize!:ElementRef<HTMLInputElement>;

  constructor() { }

  ngOnInit(): void {
  }

  public onSearch() {
    const value = this.txtBuscar.nativeElement.value;

    if (value.trim().length == 0) {
      return;
    }
    
    this.searchEmit.emit(value);
    this.txtBuscar.nativeElement.value = '';
  }

  public onSizeChange(): void {
    const value = Number(this.selectSize.nativeElement.value) || 12;
    this.sizeEmit.emit(value);
  } 

}
