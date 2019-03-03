import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { GenProvider } from '../../providers/gen/gen';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
    selector: 'page-super',
    templateUrl: 'super.html',
})
export class SuperPage {

    user: any = {};
shops:any=[];

constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public prov: GenProvider,
    public http: HttpClient ,
    private toastCtrl: ToastController
) {
}

ionViewDidLoad() {
    this.user=JSON.parse(localStorage.getItem('user')); 
    this.get_unapproved();
}

get_unapproved()
{
    var link=this.prov.php+'get_unapproved.php';

    this.http.get(link)
        .subscribe(data => {
        let res= data;
        //console.log(res);
        this.shops=res;

    }, error => {
        console.log(error);
    });
}

approve(shop_id,owner_id)
{
    var myData = JSON.stringify(
        {
            shop_id: shop_id,
            owner_id:owner_id
        });
    var link=this.prov.php+'approve_shop.php';

    this.http.post(link, myData)
        .subscribe(data => {
        let res = data; 
        //console.log(res);
        this.get_unapproved();
        let toast = this.toastCtrl.create({
            message: res['msg'],
            duration: 3000,
            position: 'bottom'
        });
        toast.present();


    }, error => {
        console.log(error);
    });
}

}
