import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

/**
 * Generated class for the ShopFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shop-form',
  templateUrl: 'shop-form.html',
})
export class ShopFormPage {
  vehicleTypes: any = [];
  carpets: any = [];
  litres: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController) {
  	this.vehicleTypes =[{name:"Saloon",image:"assets/imgs/cars/saloon-i.png", checked:false},
    {name:"Station Wagon",image:"assets/imgs/cars/station-wagon.png", checked:false},
    {name:"Single Cabin Pickup",image:"assets/imgs/cars/single-cab-i.png", checked:false},
    {name:"Double Cabin Pickup",image:"assets/imgs/cars/double-cab-i.png", checked:false},
    {name:"SUV",image:"assets/imgs/cars/rangerover.png", checked:false},
    {name:"PSV",image:"assets/imgs/cars/psv.png", checked:false},
    {name:"Lorry",image:"assets/imgs/cars/lorry.png", checked:false},
    {name:"Trailer",image:"assets/imgs/cars/trailer.png", checked:false},
    {name:"Heavy Machinery",image:"assets/imgs/cars/tractor.png", checked:false},
    {name:"Others",image:"assets/imgs/cars/saloon.png", checked:false}];

    this.carpets = [{name:"Doormat",price:500,checked: false },
    {name:"Small",price:500,checked: false },
    {name:"Big",price:2000,checked: false },
    {name:"Large",price:2500,checked: false }];

    this.litres = [{name:"20L",price:5,checked: false },
    {name:"50L",price:13,checked: false },
    {name:"100L",price:26,checked: false },
    {name:"1000L",price:260,checked: false }];
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopFormPage');
  }

  openMenu() {
	 this.menuCtrl.open();
  }


  openPage(page){ 	
  	this.navCtrl.push(page);
  }


}
