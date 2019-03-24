import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Content } from 'ionic-angular';
import {debounceTime} from "rxjs/operators/debounceTime";
import {FormControl} from "@angular/forms";
import * as _ from 'lodash';
import { GenProvider } from '../../providers/gen/gen';
import { HttpClient } from '@angular/common/http';

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
slide_down: boolean = false;
serviceList: boolean = false;
services: any = [];
carpetType: string = "";
paymentObj: any = {shop_name:"", shop_id:"",service_list:[], total:0};
invoice_id;
user: any = {};
payment_status="Awaiting Payment";
serviceSelected: boolean = false;
buyWater: boolean = true;
previousMeterReading;
currentMeterReading;
serviceCharge: number = 100;
sell_water;
water_bill;
readingExists: boolean = false;
maintenance;
ucost;
mcost;

constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public menuCtrl: MenuController,
    public prov: GenProvider,
    public http: HttpClient
) {
    /*this.shops = [
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
        {name:"Mwajeu Car Wash"}];*/
    this.user=JSON.parse(localStorage.getItem('user'));
    this.get_shops();

    /*this.services = [{name:"20L",price:5,checked: false },
                     {name:"50L",price:13,checked: false },
                     {name:"100L",price:26,checked: false },
                     {name:"1000L",price:260,checked: false }];*/

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

update(e)
{
    let amount=this.paymentObj.total;
    let phone=this.user.phone;
    let iid=this.invoice_id;

    //console.log(amount, phone)

    var link=this.prov.php+'stk.php';
    var myData = JSON.stringify(
        {
            amount:amount,
            phone:phone,
            iid:iid
        });

    this.http.post(link, myData)
        .subscribe(data => {

        let res= data;

        //console.log(res);

    }, error => {
        console.log(error);
    });
}

refresh_status()
{
    this.prov.show_loader("Please wait");
    var link=this.prov.php+'validate.php'
    var myData = JSON.stringify(
        {
            iid: this.invoice_id
        });

    this.http.post(link, myData)
        .subscribe(data => {

        let res= data;
        //console.log(res['Status']);

        if(res['Status']=='BAD REQUEST')
        {
            this.prov.dismiss_loader();
            this.payment_status="Still Awaiting Payment";
        }
        else
        {
            this.save_payment(res);
        }


    }, error => {
        console.log(error);
    });
}

save_payment(res)
{ 
    this.prov.dismiss_loader();
    let iid=res['AccountNumber'];
    let amount=res['amount'];

    var link=this.prov.php+'save_payment.php';
    var myData = JSON.stringify(
        {
            amount:amount,
            iid:iid
        });

    this.http.post(link, myData)
        .subscribe(data => {

        let res= data;
        //console.log(res);
        this.payment_status=res['status'];

    }, error => {
        console.log(error);
    });
}

setVisible(list, payload){
    if(list=="reviewList"){

        if(this.buyWater){
            let service_list = [];
            let total = 0;
            let count = 0;
            let service_names= "Swift Water : ";
            this.services.forEach((service)=>{
                if(service.checked){
                    count++;
                    service_list.push(service);
                    service_names=service_names+service.name+", ";
                    total += service.price;
                }
            })
            if(count){
                this.paymentObj.service_list = service_list;
                this.paymentObj.total = total;
                service_names = service_names.replace(/,\s*$/, "");

                this.shopList = false;
                this.serviceList = false;
                this.reviewList = true;
                let that = this;

                //save invoice in db
                var myData = JSON.stringify(
                    {
                        uid: this.user.id ,  
                        shop_id:this.paymentObj.shop_id,
                        service_names:service_names,
                        total:this.paymentObj.total
                    });
                var link=this.prov.php+'save_invoice.php';

                this.http.post(link, myData)
                    .subscribe(data => {
                    let res = data; 
                    //console.log(res);
                    this.invoice_id=res[0];

                }, error => {
                    console.log(error);
                });

                setTimeout(()=>{
                    that.slide_down = true;
                },300);
            }
        } else {
            let service_list = []; console.log(this.maintenance);
            let service_names= "Water Bill Payment";
            let mcost=0;
            let bill=(this.currentMeterReading - this.previousMeterReading)* this.ucost;
            let waterCost={name:"Water Bill",price:bill};
            this.paymentObj.service_list.push(waterCost);

            if(this.maintenance)
            {
                let mainCost={name:"Maintenance Bill",price:this.mcost};
                this.paymentObj.service_list.push(mainCost);
                mcost=this.mcost;
                service_names=service_names+" and Meter Maintenance ";
            }

            this.paymentObj.total = bill+mcost;

            //save invoice in db
            var myData = JSON.stringify(
                {
                    uid: this.user.id ,  
                    shop_id:this.paymentObj.shop_id,
                    service_names:service_names,
                    total:this.paymentObj.total
                });
            var link=this.prov.php+'save_invoice.php';

            this.http.post(link, myData)
                .subscribe(data => {
                let res = data; 
                //console.log(res);
                this.invoice_id=res[0];

            }, error => {
                console.log(error);
            });


            this.shopList = false;
            this.serviceList = false;
            this.reviewList = true;
            setTimeout(()=>{
                this.slide_down = true;
            },300);
            //save invoice in db
            
            //save meter reading
            var myData = JSON.stringify(
                {
                    uid: this.user.id ,
                    meterReading:this.currentMeterReading
                });
            var link=this.prov.php+'saveMeterReading.php';

            this.http.post(link, myData)
                .subscribe(data => {
                let res = data; 
                console.log(res);

            }, error => {
                console.log(error);
            });


            this.shopList = false;
            this.serviceList = false;
            this.reviewList = true;
            setTimeout(()=>{
                this.slide_down = true;
            },300);
            
        }
    } else if(list=="shopList"){
        this.shopList = true;
        this.serviceList = false;
        this.reviewList = false;

    } else if(list=="serviceList"){
        if(payload){
            this.paymentObj.shop_name = payload.name;
            this.paymentObj.shop_id = payload.id;
            this.sell_water=payload.sell_water;
            this.water_bill=payload.water_bill;
            this.readingExists=payload.readingExists;
            this.ucost=payload.unitCost;
            this.mcost=payload.maintenanceCost;
            this.previousMeterReading=payload.lastReading
            //console.log(this.paymentObj);
        }

        //get service prices
        var myData = JSON.stringify(
            {
                shop_id:this.paymentObj.shop_id                  
            });

        var link=this.prov.php+'get_water_prices.php';

        this.http.post(link, myData)
            .subscribe(data => {
            let res = data; 
            //console.log(res);
            this.services=res;

        }, error => {
            console.log(error);
        });
        this.shopList = false;
        this.serviceList = true;
        this.reviewList = false;

    }
}

get_shops()
{
    var link=this.prov.php+'get_water_shops.php';

    var myData = JSON.stringify(
        {
            uid:this.user.id
        });

    this.http.post(link,myData)
        .subscribe(data => {

        let res= data;
        console.log(res);
        this.shops=res;

        this.allShops = this.shops;

        let result = _(this.allShops)
        .groupBy(o => o.name[0].toUpperCase())
        .map((shops, letter) => ({ letter, shops }))
        .value();

        result = _.orderBy(result, ['letter'],['asc']);

        this.sections = result;

    }, error => {
        console.log(error);
    });
}

openMenu() {
    this.menuCtrl.open();
}

ionViewWillEnter(){
    localStorage.setItem("activePage","Swift Water");
}

ionViewDidLoad() {

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

selectService(buyWater){
    this.serviceSelected = true;
    this.buyWater = buyWater;
}

gobacktoMenu(){
    this.serviceSelected = false;
}

}
