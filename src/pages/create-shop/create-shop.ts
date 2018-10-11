import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

/**
 * Generated class for the CreateShopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-shop',
  templateUrl: 'create-shop.html',
})
export class CreateShopPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl:MenuController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateShopPage');
  }

  openMenu() {
	 this.menuCtrl.open();
  }


  openPage(page){ 	
  	this.navCtrl.push(page);
  }

}
