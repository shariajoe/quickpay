import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage({
  
})

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  objectblock:any = {};

  constructor(public navCtrl: NavController) {

  }

  openPage(page) {
    this.navCtrl.setRoot(page);
  }

}
