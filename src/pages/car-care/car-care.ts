import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Content } from 'ionic-angular';
import {debounceTime} from "rxjs/operators/debounceTime";
import {FormControl} from "@angular/forms";
import * as _ from 'lodash';

/**
 * Generated class for the CarCarePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-car-care',
  templateUrl: 'car-care.html',
})
export class CarCarePage {

  @ViewChild('pageTop') pageTop: Content;

  shops: any = [];
  allShops: any = [];
  searchTerm: string = '';
  searchControl: FormControl;
  searching: boolean = false;
  sections: any = [];
  vehicleTypes: any = [];
  shopList: boolean = true;
  carList: boolean = false;
  serviceList: boolean = false;
  reviewList: boolean = false;
  slide_down: boolean = false;
  services: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController) {
    this.shops = [
    {name:"Steve Wash"},
    {name:"Azei Cleaning Services"},
    {name:"Wabrian Cleaners"},
    {name:"Ann Wash"},
    {name:"Paul Agencies"},
    {name:"Roy Wash"},
    {name:"Juliet Wash"},
    {name:"Nderitu Wash"},
    {name:"Kayanda Wash"},
    {name:"Sharia Wash"},
    {name:"Sharon Wash"},
    {name:"Friends Car Wash"},
    {name:"Midiwo Wash"},
    {name:"Okoth Obado Wash"},
    {name:"Mwajeu Car Wash"}];


    this.vehicleTypes =[{name:"Saloon",image:"assets/imgs/cars/saloon-i.png"},
    {name:"Station Wagon",image:"assets/imgs/cars/station-wagon.png"},
    {name:"Single Cabin Pickup",image:"assets/imgs/cars/single-cab-i.png"},
    {name:"Double Cabin Pickup",image:"assets/imgs/cars/double-cab-i.jpg"},
    {name:"SUV",image:"assets/imgs/cars/rangerover.jpg"},
    {name:"PSV",image:"assets/imgs/cars/psv.jpg"},
    {name:"Lorry",image:"assets/imgs/cars/lorry.jpeg"},
    {name:"Trailer",image:"assets/imgs/cars/trailer.png"},
    {name:"Heavy Machinery",image:"assets/imgs/cars/tractor.jpg"},
    {name:"Others",image:"assets/imgs/cars/saloon.png"}];


    this.services = [{name:"Exterior Basic",price:1000},
    {name:"Interior Basic",price:2000},
    {name:"Engine Clean",price:4500},
    {name:"Under Wash",price:500},
    {name:"Vacuum Interior",price:500},
    {name:"Upholstery Clean",price:500},
    {name:"Interior Polish",price:600},
    {name:"Tire Polish",price:2000},
    {name:"Buffing",price:3000},
    {name:"Body Wax",price:3000}];

    this.allShops = this.shops;

    let result = _(this.allShops)
        .groupBy(o => o.name[0].toUpperCase())
        .map((shops, letter) => ({ letter, shops }))
        .value();

    result = _.orderBy(result, ['letter'],['asc']);

	this.sections = result;

    this.searchControl = new FormControl();

    this.searchControl.valueChanges.pipe(debounceTime(700)).subscribe(search => {
      if (this.searchTerm.length >= 3) {
        this.getShops();
      }
    });
  }

  ionViewWillEnter(){
  	localStorage.setItem("activePage","Car Care");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarCarePage');

  }

  openMenu() {
	 this.menuCtrl.open();
  }

  setVisible(list){
  	 this.pageScroller();
     if(list=="carList"){
        this.shopList = false;
        this.serviceList = false;
        this.carList = true;
        this.reviewList = false;

     } else if(list=="shopList"){
     	this.shopList = true;
        this.serviceList = false;
        this.carList = false;
        this.reviewList = false;

     } else if(list=="serviceList"){
     	this.shopList = false;
        this.serviceList = true;
        this.carList = false;
        this.reviewList = false;
     }
     else if(list=="reviewList"){
     	this.shopList = false;
        this.serviceList = false;
        this.carList = false;
        this.reviewList = true;
        let that = this;
        setTimeout(()=>{
        	 that.slide_down = true;
        },300);
     }

  }

  pageScroller(){
    //scroll to page top
    this.pageTop.scrollToTop();
  }


  getShops(){
    let filteredShops = this.allShops.filter(shop => shop.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) >= 0);
    this.shops= filteredShops;
    let result = _(this.shops)
        .groupBy(o => o.name[0].toUpperCase())
        .map((shops, letter) => ({ letter, shops }))
        .value();

    result = _.orderBy(result, ['letter'],['asc']);

	this.sections = result;

  }

  onSearchInput(){

    
    if(this.searchTerm.length >= 3){
      this.searching = true;
    }
  }

}
