import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { detalle } from '../detalle/detalle';
import { ComicService } from '../../providers/comic-service';
import {Md5} from 'ts-md5/dist/md5';
import { Http } from '@angular/http';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
  providers: [ComicService]
})

export class ListPage {
  public comics: any;
  parametro_uno: string;
  fecha: String = '';
  fecha2: String = ''; 
  error_fecha: String = '';

  constructor(public navCtrl: NavController, public navParams: NavParams,public getcomicService: ComicService,public http: Http) {
    this.cargarComics(1);
    this.fecha = '';
    this.fecha2 = '';
    this.parametro_uno = '';
    this.error_fecha = '';
  }

  cargarComics(event) {
      var parameters = '';
      if (!((this.parametro_uno === undefined) || (this.parametro_uno  === '')))
        parameters = parameters + '&titleStartsWith='+this.parametro_uno ;
      if (this.fecha!= '' && this.fecha2!='')
        parameters = parameters + '&dateRange='+this.fecha+','+this.fecha2;


      parameters = parameters+'&orderBy=title&limit=25&apikey='+'773f8575cc9996ae573b95c89d4b8b41'+'&hash='+Md5.hashStr('1'+'c8e50bd59d0265ed65c01ca0b01b2f9239572a29'+'773f8575cc9996ae573b95c89d4b8b41')+'&ts=1'
      //console.log(parameters);
      this.getcomicService.loadData(parameters)
        .then(data => {
          //console.log(data);
          this.comics = data.data.results;
        });
  }
  
  buscarComics(event: any) { // without type info
    if (new Date(this.fecha2.toString()).getTime() < new Date(this.fecha.toString()).getTime()){
        //error manejar
        this.error_fecha="La fecha desde no debe ser mayor a fecha hasta";

    }else{
      this.error_fecha=" ";
      this.cargarComics(1);

      }
  }

  itemTapped(event, comic) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(detalle, {
      comic: comic
    });
  }
}
