import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { MenuProvider } from '../../providers/menu/menu';

@IonicPage({
  
})

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  objectblock:any = {};
  firstPage: boolean = true;

  constructor(public navCtrl: NavController, public menuProvider:MenuProvider) {

  }

  openPage(page) {
  	if(page === "DashboardPage"){
  		this.menuProvider.activePage = "Home";
  		this.navCtrl.setRoot(page);
  	}
  	else{
	    this.navCtrl.setRoot(page);
	}
  }

  goNext(){
  	this.firstPage = false;
  }

}
