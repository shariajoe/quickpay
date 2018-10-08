import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {debounceTime} from "rxjs/operators/debounceTime";
import {FormControl} from "@angular/forms";
import * as _ from 'lodash';

/**
 * Generated class for the CarpetKlinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-carpet-klin',
  templateUrl: 'carpet-klin.html',
})
export class CarpetKlinPage {
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
  services: any = [];
  carpetType: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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

    this.services = [{name:"Doormat"},
    {name:"Small"},
    {name:"Big"},
    {name:"Large"}];

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
  	localStorage.setItem("activePage","CarpetKlin");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarpetKlinPage');

  }

  setVisible(list){
     if(list=="carList"){
        this.shopList = false;
        this.serviceList = false;
        this.carList = true;
     } else if(list=="shopList"){
     	this.shopList = true;
        this.serviceList = false;
        this.carList = false;

     } else if(list=="serviceList"){
     	this.shopList = false;
        this.serviceList = true;
        this.carList = false;

     }
  }


  getShops(){
    let filteredShops = this.allShops.filter(shop => shop.name.toLowerCase().indexOf(this.searchTerm) >= 0);
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
