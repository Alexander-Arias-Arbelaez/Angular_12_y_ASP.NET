import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatTable } from '@angular/material/table';
import { actorPeliculaDTO } from 'src/app/actores/actor';
import { ActoresService } from 'src/app/actores/actores.service';

@Component({
  selector: 'app-autocomplete-autores',
  templateUrl: './autocomplete-autores.component.html',
  styleUrls: ['./autocomplete-autores.component.css'],
})
export class AutocompleteAutoresComponent implements OnInit {
  constructor(private actoresService: ActoresService) {}

  control: FormControl = new FormControl();

  @Input()
  actoresSeleccionados: actorPeliculaDTO[] =[];

  actoresAMostrar: actorPeliculaDTO[] = [];

  columnasAMostrar = ['imagen', 'nombre', 'personaje', 'acciones'];

  @ViewChild(MatTable) table: MatTable<any>;

  ngOnInit(): void {
    this.control.valueChanges.subscribe(nombre => {
      this.actoresService.obtenerPorNombre(nombre).subscribe(actores => {
      this.actoresAMostrar = actores;
      })
    });
  }

  optionSelected(event: MatAutocompleteSelectedEvent){
    console.log(event.option.value);
    this.actoresSeleccionados.push(event.option.value);
    this.control.patchValue('');
    if (this.table !== undefined){
      this.table.renderRows();
    }
  }

  eliminar(actor){
    const indice = this.actoresSeleccionados.findIndex(a => a.nombre === actor.nombre);
    this.actoresSeleccionados.splice(indice, 1);
    this.table.renderRows();
  }

  finalizarArrastre(event: CdkDragDrop<any[]>){
    const indicePrevio = this.actoresSeleccionados.findIndex(
      actor => actor === event.item.data
    )
    moveItemInArray(this.actoresSeleccionados, indicePrevio, event.currentIndex);
    this.table.renderRows();
  }

}
