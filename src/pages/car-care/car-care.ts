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
paymentObj: any = {car_id:"", shop_id:"",shop_name:"",car_type_img:"",car_type_name:"", service_list:[], total:0};
user: any = {};
payment_status="Awaiting Payment";
invoice_id;

constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public menuCtrl: MenuController,
    public prov: GenProvider,
    public http: HttpClient 
) {   


    /*this.shops = [
        {name:"Steve Wash" , id:12},
        {name:"Azei Cleaning Services" , id:12},
        {name:"Wabrian Cleaners" , id:12},
        {name:"Ann Wash" , id:12},
        {name:"Paul Agencies" , id:12},
        {name:"Roy Wash" , id:12},
        {name:"Juliet Wash", id:12},
        {name:"Nderitu Wash", id:12},
        {name:"Kayanda Wash", id:12},
        {name:"Sharia Wash", id:12},
        {name:"Tiffany Wash", id:12},
        {name:"Friends Car Wash", id:12},
        {name:"Midiwo Wash", id:12},
        {name:"Timo Wash", id:12},
        {name:"Mwajeu Car Wash", id:12}];*/

    this.get_shops();

    /*this.vehicleTypes =[{name:"Saloon",image:"assets/imgs/cars/saloon-i.png"},
                        {name:"Station Wagon",image:"assets/imgs/cars/station-wagon.png"},
                        {name:"Single Cabin Pickup",image:"assets/imgs/cars/single-cab-i.png"},
                        {name:"Double Cabin Pickup",image:"assets/imgs/cars/double-cab-i.png"},
                        {name:"SUV",image:"assets/imgs/cars/rangerover.png"},
                        {name:"PSV",image:"assets/imgs/cars/psv.png"},
                        {name:"Lorry",image:"assets/imgs/cars/lorry.png"},
                        {name:"Trailer",image:"assets/imgs/cars/trailer.png"},
                        {name:"Heavy Machinery",image:"assets/imgs/cars/tractor.png"},
                        {name:"Others",image:"assets/imgs/cars/saloon.png"}];*/


    /*this.services = [{name:"Exterior Basic",price:1,checked: false },
                     {name:"Interior Basic",price:2000,checked: false },
                     {name:"Engine Clean",price:4500,checked: false },
                     {name:"Under Wash",price:500,checked: false },
                     {name:"Vacuum Interior",price:500,checked: false },
                     {name:"Upholstery Clean",price:500,checked: false },
                     {name:"Interior Polish",price:600,checked: false },
                     {name:"Tire Polish",price:2000,checked: false },
                     {name:"Buffing",price:3000,checked: false },
                     {name:"Body Wax",price:3000,checked: false }];*/



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
}

openMenu() {
    this.menuCtrl.open();
}

get_shops()
{
    var link=this.prov.php+'get_car_shops.php';

    this.http.get(link)
        .subscribe(data => {

        let res= data;
        //console.log(res);
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

    }, error => {
        console.log(error);
    });
}

setVisible(list,payload){
    this.pageScroller();
    if(list=="carList"){
        if(payload){
            this.paymentObj.shop_name = payload.name;
            this.paymentObj.shop_id = payload.id;
        }

        //get vehicles car wash services
        var myData = JSON.stringify(
            {
                shop_id: this.paymentObj.shop_id                  
            });

        var link=this.prov.php+'get_cars.php';

        this.http.post(link, myData)
            .subscribe(data => {
            let res = data; 
            this.vehicleTypes=res;

        }, error => {
            console.log(error);
        });


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
            this.paymentObj.car_id = payload.id;
        }

        //get service prices
        var myData = JSON.stringify(
            {
                shop_id:this.paymentObj.shop_id,
                car_id: this.paymentObj.car_id                  
            });

        var link=this.prov.php+'get_prices.php';

        this.http.post(link, myData)
            .subscribe(data => {
            let res = data; 
            this.services=res;

        }, error => {
            console.log(error);
        });


        this.shopList = false;
        this.serviceList = true;
        this.carList = false;
        this.reviewList = false;
    }
    else if(list=="reviewList"){  

        let service_list = [];
        let service_names=  this.paymentObj.car_type_name+" : ";
        let total = 0;
        let count = 0;
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
            service_names = service_names.replace(/,\s*$/, "");
            //console.log(service_names);
            this.paymentObj.total = total;

            this.shopList = false;
            this.serviceList = false;
            this.carList = false;
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
