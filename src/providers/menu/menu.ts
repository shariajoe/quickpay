import { Injectable } from '@angular/core';

/*
  Generated class for the MenuProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MenuProvider {

  activePage: string = "";

  constructor() {
    console.log('Hello MenuProvider Provider');
    this.activePage = localStorage.getItem("activePage")?localStorage.getItem("activePage"):"";
    
    
  }

}
