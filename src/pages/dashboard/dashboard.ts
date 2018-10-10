import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { MenuProvider } from '../../providers/menu/menu';
/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController,
  	public menuProvider: MenuProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }
  
  openMenu() {
	 this.menuCtrl.open();
  }

  openPage(page){
  	if(page === "HomePage"){
  		this.menuProvider.activePage = "Home";
  	} else if(page === "CarCarePage"){
  		this.menuProvider.activePage = "Car Care";
  	} else if(page === "CarpetKlinPage"){
  		this.menuProvider.activePage = "CarpetKlin";
  	} else if(page === "GarbagePage"){
  		this.menuProvider.activePage = "Garbage Kollect";
  	}
  	
  	this.navCtrl.setRoot(page);
  }
}
