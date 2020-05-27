import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://crud-c308d.firebaseio.com'

  constructor(private http: HttpClient) { }

  crearHeroe(heroe: HeroeModel) {
    return this.http.post(`${this.url}/heroes.json`, heroe)
      .pipe(
        map((respuestaPeticion: any) => {
          heroe.id = respuestaPeticion.name;
          return heroe;
        })
      );
  }

  actualizarHeroe(heroe: HeroeModel) {
    const heroeTemp = {
      //genera todos los atributos del model
      ...heroe
    };
    //borro el id del nuevo heroe
    delete heroeTemp.id;
    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTemp);
  }

  getHeroes() {
    return this.http.get(`${this.url}/heroes.json`).pipe(
      //Convertir el observable a la funcion
      map(resp => this.crearArray(resp) )
    )
  }
  //metodo para modificar el objeto que llega de firebase
  private crearArray(heroesObj: Object) {
    const heroes:HeroeModel[] = [];
    //console.log(heroesObj);
    //si es vacion ps lo mando vacio
    if(heroesObj === null){
      return [];
    }
    //cambio el id fuera del objeto a dentro del bojeto
    Object.keys(heroesObj).forEach(key =>{
      const heroe:HeroeModel = heroesObj[key];
      heroe.id = key;
      //agrego al arreglo
      heroes.push(heroe);
    })
    //retorno ya tood final
    return heroes;
  }
  //recibo el id como parametro
  heroeId(id:string){
    //pido la info del respectivo heroe con su id
    return this.http.get(`${this.url}/heroes/${id}.json`)
  }
  //borrar heroe
  borrar(id:string){
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }

}
