import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the GenProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GenProvider {
//php="http://localhost:90/quickpay/";
php="https://fastpesa.co.ke/swiftpay/";

  constructor(public http: HttpClient) {
    console.log('Hello GenProvider Provider');
  }

}
