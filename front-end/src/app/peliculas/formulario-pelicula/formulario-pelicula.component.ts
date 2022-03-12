import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { actorPeliculaDTO } from 'src/app/actores/actor';
import { multipleSelectorModel } from 'src/app/utilidades/selector-multiple/multipleSelectorModel';
import { peliculaCreacionDTO, peliculaDTO } from '../pelicula';


@Component({
  selector: 'app-formulario-pelicula',
  templateUrl: './formulario-pelicula.component.html',
  styleUrls: ['./formulario-pelicula.component.css']
})
export class FormularioPeliculaComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  form: FormGroup

  @Input()
  errores: string[] =[];

  @Input()
  modelo: peliculaDTO;

  @Output()
  OnSubmit: EventEmitter<peliculaCreacionDTO> = new EventEmitter<peliculaCreacionDTO>();

  @Input()
  generosNoSeleccionados: multipleSelectorModel[]; 

  @Input()
  generosSeleccionados: multipleSelectorModel[] = [];

  @Input()
  cinesNoSeleccionados: multipleSelectorModel[];

  @Input()
  cinesSeleccionados: multipleSelectorModel[] = [];

  @Input()
  actoresSeleccionados: actorPeliculaDTO[] = [];

  imagenCambiada = false;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      titulo: [
        '',
        {
          validators: [Validators.required]
        }
      ],
      resumen: '',
      enCines: false,
      trailer: '',
      fechaLanzamiento: '',
      poster: '',
      generosIds: '',
      cinesIds: '',
      actores: ''
    });

    if (this.modelo !== undefined){
      this.form.patchValue(this.modelo);
    }
  }

  archivoSeleccionado(archivo: File){
    this.form.get('poster').setValue(archivo);
    this.imagenCambiada = true;
  }

  changeMarkdown(texto){
    this.form.get('resumen').setValue(texto);
  }

  guardarCambios(){    
    const generosId = this.generosSeleccionados.map(val => val.llave);
    this.form.get('generosIds').setValue(generosId);
    
    const cinesId = this.cinesSeleccionados.map(val => val.llave);
    this.form.get('cinesIds').setValue(cinesId);

    const actores = this.actoresSeleccionados.map(val => {
      return {id: val.id, personaje: val.personaje}
    });
    this.form.get('actores').setValue(actores);

    if (!this.imagenCambiada){
      this.form.patchValue({'poster': null});
    }

    this.OnSubmit.emit(this.form.value);
  }

}
