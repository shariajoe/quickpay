import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController,ToastController } from 'ionic-angular';
import { GenProvider } from '../../providers/gen/gen';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
    selector: 'page-account',
    templateUrl: 'account.html',
})
export class AccountPage {

    isPasswordForm: boolean = true;
user: any = {};
pass1;
pass2;
balance;
swiftpay_fee=0;
mpesa_fees=0;
towithdraw=0;
phone="07";

constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public menuCtrl: MenuController,
    public prov: GenProvider,
    public http: HttpClient ,
    private toastCtrl: ToastController
) {
}

ionViewDidLoad() {
    if(localStorage.getItem('user')){
        this.user=JSON.parse(localStorage.getItem('user'));  
        console.log(this.user);
    }

    this.getBalance();
}

openMenu() {
    this.menuCtrl.open();
}

withdraw()
{
    if(this.balance<100)
    {
        let toast = this.toastCtrl.create({
            message: "Minimum amount is shs. 100",
            showCloseButton: true,
            position: 'bottom'
        });

        toast.present();
    }else
    {
        this.prov.show_loader('Please wait ..');
        var link=this.prov.php+'b2c.php';
        var myData = JSON.stringify(
            {
                amount:this.towithdraw,
                phone:this.phone,
                uid:this.user.id
            });

        this.http.post(link, myData)
            .subscribe(data => {

            this.prov.dismiss_loader();
            this.getBalance();
            
            let res= data;
            console.log(res);

            let toast = this.toastCtrl.create({
                message: res['msg'],
                showCloseButton: true,
                position: 'bottom'
            });

            toast.present();

        }, error => {
            console.log(error);
        });
    }
}

getBalance()
{
    var myData = JSON.stringify(
        {
            uid: this.user.id
        }
    );
    var link=this.prov.php+'getBalance.php';

    this.http.post(link, myData)
        .subscribe(r => {
        let res=r;

        console.log(res);
        this.balance=res['balance'];
        this.phone=res['phone'];
        this.swiftpay_fee=Math.round(this.balance*0.14);
        this.mpesa_fees=(this.balance < 1000 ? 15 : 22 );
        this.towithdraw=this.balance-this.swiftpay_fee-this.mpesa_fees;

    }, error => {
        console.log(error);
    });
}

openPage(page){ 
    this.navCtrl.push(page);
}

changePassword(change){
    if(change){
        this.isPasswordForm = true;
    }
    else{
        this.isPasswordForm = false;
    }
}

change_password()
{
    var myData = JSON.stringify(
        {
            pass1: this.pass1 , 
            pass2: this.pass2,
            user_id:this.user.id
        }
    );
    var link=this.prov.php+'change_password.php';

    this.http.post(link, myData)
        .subscribe(r => {
        let res=r;

        let toast = this.toastCtrl.create({
            message: r['msg'],
            duration: 3000,
            position: 'bottom'
        });

        toast.present();

    }, error => {
        console.log(error);
    });
}

}
