import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ComicService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ComicService {
  data: any;
  constructor(public http: Http) {
    console.log('Hello ComicService Provider');
  }
  loadData(parameters){
    if (this.data && parameters==null) {
      // already loaded data
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      this.http.get('https://gateway.marvel.com/v1/public/comics?format=comic&formatType=comic'+parameters)
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.data = data;
          resolve(this.data);
        });
    });
  }
}
