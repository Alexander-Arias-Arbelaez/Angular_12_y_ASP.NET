import { Component, Input, OnInit } from '@angular/core';
import { multipleSelectorModel } from './multipleSelectorModel';

@Component({
  selector: 'app-selector-multiple',
  templateUrl: './selector-multiple.component.html',
  styleUrls: ['./selector-multiple.component.css']
})
export class SelectorMultipleComponent implements OnInit {

  constructor() { }

  @Input()
  Seleccionados: multipleSelectorModel[] = [];
  
  @Input()
  NoSeleccionados: multipleSelectorModel[] = [];

  ngOnInit(): void {
  }

  seleccionar(item: multipleSelectorModel, index: number){
    this.Seleccionados.push(item);
    this.NoSeleccionados.splice(index, 1);
  }
  
  deseleccionar(item: multipleSelectorModel, index: number){
    this.NoSeleccionados.push(item);
    this.Seleccionados.splice(index, 1);
  }

  seleccionarTodo(){
    this.Seleccionados.push(...this.NoSeleccionados);
    this.NoSeleccionados = [];
  }
  deseleccionarTodo(){
    this.NoSeleccionados.push(...this.Seleccionados);
    this.Seleccionados = [];

  }

}
