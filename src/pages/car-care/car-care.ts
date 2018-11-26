import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Content } from 'ionic-angular';
import {debounceTime} from "rxjs/operators/debounceTime";
import {FormControl} from "@angular/forms";
import * as _ from 'lodash';
import { GenProvider } from '../../providers/gen/gen';
import { HttpClient } from '@angular/common/http';

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
paymentObj: any = {shop_name:"",car_type_img:"",car_type_name:"", service_list:[], total:0};
user: any = {};

constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public menuCtrl: MenuController,
    public prov: GenProvider,
    public http: HttpClient 
) {   


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
                        {name:"Double Cabin Pickup",image:"assets/imgs/cars/double-cab-i.png"},
                        {name:"SUV",image:"assets/imgs/cars/rangerover.png"},
                        {name:"PSV",image:"assets/imgs/cars/psv.png"},
                        {name:"Lorry",image:"assets/imgs/cars/lorry.png"},
                        {name:"Trailer",image:"assets/imgs/cars/trailer.png"},
                        {name:"Heavy Machinery",image:"assets/imgs/cars/tractor.png"},
                        {name:"Others",image:"assets/imgs/cars/saloon.png"}];


    this.services = [{name:"Exterior Basic",price:1,checked: false },
                     {name:"Interior Basic",price:2000,checked: false },
                     {name:"Engine Clean",price:4500,checked: false },
                     {name:"Under Wash",price:500,checked: false },
                     {name:"Vacuum Interior",price:500,checked: false },
                     {name:"Upholstery Clean",price:500,checked: false },
                     {name:"Interior Polish",price:600,checked: false },
                     {name:"Tire Polish",price:2000,checked: false },
                     {name:"Buffing",price:3000,checked: false },
                     {name:"Body Wax",price:3000,checked: false }];

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
    this.user=JSON.parse(localStorage.getItem('user'));       
    console.log(this.user);

}

openMenu() {
    this.menuCtrl.open();
}

update(e)
{
    let amount=this.paymentObj.total;
    let phone=this.user.phone;

    var link=this.prov.php+'api/stk.php';
    var myData = JSON.stringify(
        {
            amount:amount,
            phone:phone
        });

    this.http.post(link, myData)
        .subscribe(data => {

        let res= data;

        console.log(res);

    }, error => {
        console.log(error);
    });
}

setVisible(list,payload){
    this.pageScroller();
    if(list=="carList"){
        if(payload){
            this.paymentObj.shop_name = payload.name;
        }
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
        if(payload){
            this.paymentObj.car_type_img = payload.image;
            this.paymentObj.car_type_name = payload.name;
        }
        this.shopList = false;
        this.serviceList = true;
        this.carList = false;
        this.reviewList = false;
    }
    else if(list=="reviewList"){
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
            this.carList = false;
            this.reviewList = true;
            let that = this;
            setTimeout(()=>{
                that.slide_down = true;
            },300);
        }
    }

}

pageScroller(){
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
