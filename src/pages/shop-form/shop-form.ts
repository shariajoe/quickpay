import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController,ToastController } from 'ionic-angular';
import { GenProvider } from '../../providers/gen/gen';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
    selector: 'page-shop-form',
    templateUrl: 'shop-form.html',
})
export class ShopFormPage {
    vehicleTypes: any = [];
carpets: any = [];
litres: any = [];
services: any = [];
data:any={};
shop_name;
user: any = {};

constructor(public navCtrl: NavController, 
            public navParams: NavParams, 
            public menuCtrl: MenuController,
            private toastCtrl: ToastController,
            public prov: GenProvider,
            public http: HttpClient 
           ) 
{
    this.vehicleTypes =[{name:"Saloon",image:"assets/imgs/cars/saloon-i.png", checked:false , id:1 ,service_prices:[] },
                        {name:"Station Wagon",image:"assets/imgs/cars/station-wagon.png", checked:false, id:2 ,service_prices:[] },
                        {name:"Single Cabin Pickup",image:"assets/imgs/cars/single-cab-i.png", checked:false, id:3 ,service_prices:[] },
                        {name:"Double Cabin Pickup",image:"assets/imgs/cars/double-cab-i.png", checked:false, id:4 ,service_prices:[] },
                        {name:"SUV",image:"assets/imgs/cars/rangerover.png", checked:false, id:5 ,service_prices:[] },
                        {name:"PSV",image:"assets/imgs/cars/psv.png", checked:false, id:6 ,service_prices:[] },
                        {name:"Lorry",image:"assets/imgs/cars/lorry.png", checked:false, id:7 ,service_prices:[] },
                        {name:"Trailer",image:"assets/imgs/cars/trailer.png", checked:false, id:8 ,service_prices:[] },
                        {name:"Heavy Machinery",image:"assets/imgs/cars/tractor.png", checked:false, id:9 ,service_prices:[] },
                        {name:"Others",image:"assets/imgs/cars/saloon.png", checked:false, id:10 ,service_prices:[] }];

    this.services = [
        {name:"Exterior Basic" , id:1 },
        {name:"Interior Basic" , id:2 },
        {name:"Engine Clean" , id:3 },
        {name:"Under Wash" , id:4 },
        {name:"Vacuum Interior" , id:5 },
        {name:"Upholstery Clean" , id:6 },
        {name:"Interior Polish", id:7 },
        {name:"Tire Polish", id:8 },
        {name:"Buffing", id:9 },
        {name:"Body Wax", id:10 },
    ];

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
    this.user=JSON.parse(localStorage.getItem('user'));   
    console.log(this.user);
}

openMenu() {
    this.menuCtrl.open();
}


openPage(page){ 	
    this.navCtrl.push(page);
}

create()
{
    let vehicle_list = [];

    this.vehicleTypes.forEach((vehicle)=>{
        if(vehicle.checked){
            vehicle_list.push(vehicle);
        }
    })


    if(this.shop_name==undefined)
    {
        let toast = this.toastCtrl.create({
            message: "Enter a shop name",
            duration: 5000,
            position: 'bottom'
        });

        toast.present();
    }
    else if( vehicle_list.length==0 )
    {
        let toast = this.toastCtrl.create({
            message: "Enter car wash prices",
            duration: 5000,
            position: 'bottom'
        });

        toast.present();
    }
    else
    {
        console.log(vehicle_list);

        var link=this.prov.php+'create_shop.php';
        var myData = JSON.stringify(
            {
                shop_name: this.shop_name,
                uid:this.user.id,
                car_wash_prices:vehicle_list
            });

        this.http.post(link, myData)
            .subscribe(data => {

            let res= data;
            console.log(res);
            
            let toast = this.toastCtrl.create({
                message: res['msg'],
                duration: 5000,
                position: 'bottom'
            });

            toast.present();

        }, error => {
            console.log(error);
        });

    }

}

set_price(vehicle,service,p)
{
    let name=service.name;
    let id=service.id;
    let price=p;
    let new_service={name:name , price:price , id:id};
    let exists=false;

    if(p!=undefined)
    {
        for(var i=0; i<vehicle.service_prices.length; i++)
        {
            if( vehicle.service_prices[i].name==name )
            {
                exists=true;
                console.log('exists');
                //delete vehicle.service_prices[i];
                vehicle.service_prices[i]=new_service;
                //vehicle.service_prices.push(new_service);
                break;
            }
        }
        if(!exists)
        {
            vehicle.service_prices.push(new_service);
        }

    }
}


}
