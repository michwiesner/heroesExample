import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HeroeModel } from '../models/heroe.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {


  private fireUrl = environment.fireUrl;
  private actUrl = environment.actUrl;
  constructor( private http: HttpClient ) {}

  nuevoHeroe( heroe: HeroeModel ) {
    const headers = new HttpHeaders ({ 'Content-Type': 'application/JSON'});

    return this.http.post( this.fireUrl, heroe, { headers }).pipe(map( (res: any) => { heroe.id = res.name; return heroe; }));

  }

  actualizarHeroe( heroe: HeroeModel ) {
    const heroeTemp = {
      ... heroe
    };
    delete heroeTemp.id;
    const headers = new HttpHeaders ({ 'Content-Type': 'application/JSON'});
    const url = `${ this.actUrl }/${ heroe.id }.json`;

    return this.http.put( url , heroeTemp, { headers }).pipe(map( res => { console.log(res); return res; }));
  }

  getHeroe( key$: string ) {

    const url = `${ this.actUrl }/${ key$ }.json`;
    return this.http.get( url ).pipe(map(res => res));
  }

  getHeroes() {
    return this.http.get( this.fireUrl ).pipe(map(res => res));
  }

  borrarHeroe( key$: string ) {
    const url = `${ this.actUrl }/${ key$ }.json`;
    return this.http.delete( url ).pipe(map(res => res));

  }

}
