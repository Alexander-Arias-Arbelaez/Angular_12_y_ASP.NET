import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { actorPeliculaDTO } from 'src/app/actores/actor';
import { multipleSelectorModel } from 'src/app/utilidades/selector-multiple/multipleSelectorModel';
import { peliculaCreacionDTO, peliculaDTO,  } from '../pelicula';
import { PeliculasService } from '../peliculas.service';

@Component({
  selector: 'app-editar-pelicula',
  templateUrl: './editar-pelicula.component.html',
  styleUrls: ['./editar-pelicula.component.css']
})
export class EditarPeliculaComponent implements OnInit {

  constructor(private peliculasService: PeliculasService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  modelo: peliculaDTO;
  generosSeleccionados: multipleSelectorModel[];
  generosNoSeleccionados: multipleSelectorModel[];
  cinesSeleccionados: multipleSelectorModel[];
  cinesNoSeleccionados: multipleSelectorModel[];
  actoresSeleccionados: actorPeliculaDTO[];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.peliculasService.putGet(params.id)
      .subscribe(peliculaPutGet => {
        this.modelo = peliculaPutGet.pelicula;

        this.generosNoSeleccionados = peliculaPutGet.generosNoSeleccionados.map(genero => {
          return <multipleSelectorModel>{llave: genero.id, valor: genero.nombre}
        });
        
        this.generosSeleccionados = peliculaPutGet.generosSeleccionados.map(genero => {
          return <multipleSelectorModel>{llave: genero.id, valor: genero.nombre}
        });
        
        this.cinesNoSeleccionados = peliculaPutGet.cinesNoSeleccionados.map(cines => {
          return <multipleSelectorModel>{llave: cines.id, valor: cines.nombre}
        });

        this.cinesSeleccionados = peliculaPutGet.cinesSeleccionados.map(cines => {
          return <multipleSelectorModel>{llave: cines.id, valor: cines.nombre}
        });

        this.actoresSeleccionados = peliculaPutGet.actores;
      })
    })
  }

  guardarCambios(pelicula: peliculaCreacionDTO){
    this.peliculasService.editar(this.modelo.id, pelicula)
    .subscribe(() => this.router.navigate(['/pelicula/' + this.modelo.id]));
  }

}
