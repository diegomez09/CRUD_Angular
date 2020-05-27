import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  arreglo: Object[] = [];
  cargando = false;

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
    this.cargando=true;
    this.heroesService.getHeroes().subscribe(resp => {
      if(resp)
      //console.log(resp);
      //asigno respuesta a mi arreglo local
      this.arreglo = resp;
      this.cargando=false;
    })
  }

  borrar(heroe: HeroeModel, i: number) {
    //implemento swal
    Swal.fire({
      title: '¿Seguro?',
      text: `Borrar a ${heroe.nombre}`,
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      //si mi then me resuelve positivo lo borro sino nel
      if (resp.value) {
        this.arreglo.splice(i, 1);
        this.heroesService.borrar(heroe.id).subscribe();
      }
    })
  }

}
