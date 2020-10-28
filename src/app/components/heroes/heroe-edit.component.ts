import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HeroesService } from 'src/app/sevices/heroes.service';
import Swal from 'sweetalert2';
import { HeroeModel } from '../../models/heroe.model';

@Component({
  selector: 'app-heroe-edit',
  templateUrl: './heroe-edit.component.html',
  styles: []
})
export class HeroeEditComponent implements OnInit {

  heroe: HeroeModel = new HeroeModel();

  nuevo = false;
  id: any;

  constructor( private _heroesService: HeroesService, private router: Router, private active: ActivatedRoute ) {
      this.active.params.subscribe( parametros => {
                                    this.id = parametros['id'];
                                    if ( this.id !== 'nuevo' ) {
                                      this._heroesService.getHeroe(this.id)
                                      .subscribe( (heroe: any) => {
                                        this.heroe = heroe;
                                        this.heroe.id = this.id;
                                      });
                                    }
                                  });
  }

  ngOnInit() {
  }

  guardar() {
    Swal.fire({
      title: 'Espere',
      text: 'Guardando informacion',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    if (this.id === 'nuevo') {
       peticion = this._heroesService.nuevoHeroe( this.heroe );

    } else {
     peticion = this._heroesService.actualizarHeroe( this.heroe );
    }

    peticion.subscribe( () => {
      Swal.fire({
        title: 'Excelente!!',
        text: 'Heroe agregado correctamente',
        icon: 'success',
        confirmButtonText: 'Cool'
      });
    }, error => {
      Swal.fire({
        title: 'Error!',
        text: error,
        icon: 'error',
      });
    });
  }

}
