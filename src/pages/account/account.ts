import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  isPasswordForm: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

  openMenu() {
	 this.menuCtrl.open();
  }

  openPage(page){ 	
  	console.log("test");
  	this.navCtrl.push(page);
  }

  changePassword(change){
  	if(change){
	    this.isPasswordForm = true;
	}
	else{
		this.isPasswordForm = false;
	}
  }

}
