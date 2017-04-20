import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'detalle',
  templateUrl: 'detalle.html'
})
export class detalle {
  detalle: any;
  precio_digital: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    var aux=navParams.get('comic');
    if (aux.prices.length==1){
      this.precio_digital=" Desconocido";
    }else{
    this.precio_digital=aux.prices[1].price;  
    }
    this.detalle = aux;
    console.log(this.detalle);
   

  }
}
