import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { GenProvider } from '../../providers/gen/gen';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
    selector: 'page-addattendant',
    templateUrl: 'addattendant.html',
})
export class AddattendantPage {

    user: any = {};
email;
shops:any=[];
addto;
attendants:any=[];

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
    this.getmyshops();
    this.get_attendants();
}

add()
{ 
    if(this.email!=undefined && this.email.trim()!="" && this.addto!=undefined)
    {
        var link=this.prov.php+'add_atendant.php';
        var myData = JSON.stringify(
            {
                email: this.email,
                shop:this.addto
            });

        this.http.post(link, myData)
            .subscribe(data => {

            let res= data;
            console.log(res);
            this.get_attendants();
            let toast = this.toastCtrl.create({
                message: res[0],
                duration: 5000,
                position: 'bottom'
            });

            toast.present();

        }, error => {
            console.log(error);
        });
    }

}

get_attendants()
{
    var link=this.prov.php+'get_attendants.php';
    var myData = JSON.stringify(
        {
            uid: this.user.id
        });

    this.http.post(link, myData)
        .subscribe(data => {

        let res= data;
        console.log(res);
        this.attendants=res;

    }, error => {
        console.log(error);
    });
}

getmyshops()
{
    var link=this.prov.php+'getmyshops.php';
    var myData = JSON.stringify(
        {
            uid: this.user.id
        });

    this.http.post(link, myData)
        .subscribe(data => {

        let res= data;
        console.log(res);
        this.shops=res;

    }, error => {
        console.log(error);
    });
}

}
