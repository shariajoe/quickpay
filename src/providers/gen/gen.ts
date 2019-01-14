import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController  } from 'ionic-angular';
/*
  Generated class for the GenProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GenProvider {
    //php="http://localhost:90/swiftpay/";
    php="https://fastpesa.co.ke/swiftpay/";
loader;

constructor(
    public http: HttpClient,
    private loadingCtrl:LoadingController
) {
    console.log('Hello GenProvider Provider');
}

show_loader(msg)
{
    this.loader = this.loadingCtrl.create({
        content: msg
    });
    this.loader.present();
}

dismiss_loader()
{
    this.loader.dismiss();
}

}
