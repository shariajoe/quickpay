import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Content } from 'ionic-angular';
import {debounceTime} from "rxjs/operators/debounceTime";
import {FormControl} from "@angular/forms";
import * as _ from 'lodash';
/**
 * Generated class for the WaterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-water',
  templateUrl: 'water.html',
})
export class WaterPage {
  @ViewChild('pageTop') pageTop: Content;
  shops: any = [];
  allShops: any = [];
  searchTerm: string = '';
  searchControl: FormControl;
  searching: boolean = false;
  sections: any = [];
  vehicleTypes: any = [];
  shopList: boolean = true;
  reviewList: boolean = false;
  serviceList: boolean = false;
  services: any = [];
  carpetType: string = "";
  slide_down: boolean = false;
  paymentObj: any = {shop_name:"", service_list:[], total:0};

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

    this.services = [{name:"20L",price:5,checked: false },
    {name:"50L",price:13,checked: false },
    {name:"100L",price:26,checked: false },
    {name:"1000L",price:260,checked: false }];

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

  setVisible(list, payload){
     if(list=="reviewList"){
       let service_list = [];
       let total = 0;
       let count = 0;
        this.services.forEach((service)=>{
            if(service.checked){
              count++;
                service_list.push(service);
                total += service.price;
            }
       })
       if(count){
        this.paymentObj.service_list = service_list;
        this.paymentObj.total = total;

         this.shopList = false;
          this.serviceList = false;
          this.reviewList = true;
          let that = this;
          setTimeout(()=>{
             that.slide_down = true;
          },300);
      }
     } else if(list=="shopList"){
       this.shopList = true;
        this.serviceList = false;
        this.reviewList = false;

     } else if(list=="serviceList"){
       if(payload){
          this.paymentObj.shop_name = payload.name;
      }
       this.shopList = false;
        this.serviceList = true;
        this.reviewList = false;

     }
  }

  openMenu() {
   this.menuCtrl.open();
  }
   
  ionViewWillEnter(){
    localStorage.setItem("activePage","Swift Water");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WaterPage');
  }

  penMenu() {
   this.menuCtrl.open();
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
