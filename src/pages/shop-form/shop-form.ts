import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController,ToastController, AlertController } from 'ionic-angular';
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
waterBillPaymentEnabled: boolean = false;
serviceType: string = "carCare";

constructor(public navCtrl: NavController, 
            public navParams: NavParams, 
            public menuCtrl: MenuController,
            private toastCtrl: ToastController,
            public prov: GenProvider,
            public http: HttpClient ,
            private alertCtrl: AlertController
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

    this.carpets = [{name:"doormat",price:"",checked: false, id:1  },
                    {name:"small",price:"",checked: false, id:2  },
                    {name:"medium",price:"",checked: false, id:3  },
                    {name:"large",price:"",checked: false, id:4  }];

    this.litres = [
        {name:"10L",price:"",checked: false, id:1  },
        {name:"20L",price:"",checked: false, id:2  },
        {name:"50L",price:"",checked: false , id:3 },
        {name:"100L",price:"",checked: false, id:4  },
        {name:"1000L",price:"",checked: false, id:5  }
    ];
}


ionViewDidLoad() {
    this.user=JSON.parse(localStorage.getItem('user'));   
}

carpet_price(price,carpet)
{
    if(price!=undefined)
    {
        carpet.price=price;
        //console.log(carpet);
    }

}

litre_price(price,litre)
{
    if(price!=undefined)
    {
        litre.price=price;
        //console.log(litre);
    }

}

openMenu() {
    this.menuCtrl.open();
}


openPage(page){ 	
    this.navCtrl.push(page);
}

/*create()
{
    console.log(this.waterBillPaymentEnabled);
}*/

create()
{
    let alert = this.alertCtrl.create({
        title: 'Create Shop',
        message: 'I confirm that I have filled in  details for all services offered at my station',
        buttons: [
            {
                text: 'Not yet',
                role: 'cancel',
                handler: () => {
                    console.log('Cancel clicked');
                }
            },
            {
                text: 'Yes I am done',
                handler: () => {
                    this.prov.show_loader('Creating shop ..');
                    let vehicle_list = [];
                    let carpet_list = [];
                    let litre_list = [];

                    this.vehicleTypes.forEach((vehicle)=>{
                        if(vehicle.checked && vehicle.service_prices.length>0){
                            vehicle_list.push(vehicle);
                        }
                    })

                    this.carpets.forEach((carpet)=>{
                        if(carpet.checked && carpet.price!=""){
                            carpet_list.push(carpet);
                        }
                    }); 
                    //console.log(carpet_list);

                    this.litres.forEach((litre)=>{
                        if(litre.checked && litre.price!=""){
                            litre_list.push(litre);
                        }
                    }); 
                    //console.log(litre_list);


                    if(this.shop_name==undefined)
                    {
                        this.prov.dismiss_loader();

                        let toast = this.toastCtrl.create({
                            message: "Enter a shop name",
                            duration: 5000,
                            position: 'bottom'
                        });

                        toast.present();
                    }
                    else if( vehicle_list.length==0 && carpet_list.length==0 && litre_list.length==0 && !this.waterBillPaymentEnabled)
                    {
                        this.prov.dismiss_loader();

                        let toast = this.toastCtrl.create({
                            message: "Enter car wash / carpet wash / water prices",
                            showCloseButton: true,
                            position: 'bottom'
                        });

                        toast.present();
                    }
                    else
                    {
                        //this.prov.dismiss_loader();
                        // console.log("all ok");
                        // console.log(vehicle_list);
                        // console.log(carpet_list);
                        // console.log(litre_list);

                        var link=this.prov.php+'create_shop.php';
                        var myData = JSON.stringify(
                            {
                                shop_name: this.shop_name,
                                uid:this.user.id,
                                car_wash_prices:vehicle_list,
                                carpet_wash_prices:carpet_list,
                                water_prices:litre_list,
                                water_bill_payment:this.waterBillPaymentEnabled
                            });

                        this.http.post(link, myData)
                            .subscribe(data => {
                            this.prov.dismiss_loader();
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
            }
        ]});
    alert.present();
}

set_price(vehicle,service,p)
{
    let name=service.name;
    let id=service.id;
    let price=p;
    let new_service={name:name , price:price , id:id};
    let exists=false;

    if(p!=undefined && p!="")
    {
        console.log(p);
        for(var i=0; i<vehicle.service_prices.length; i++)
        {

            if( vehicle.service_prices[i].name==name )
            {
                exists=true;
                console.log('exists');
                //delete vehicle.service_prices[i];
                vehicle.service_prices[i]=new_service;

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
