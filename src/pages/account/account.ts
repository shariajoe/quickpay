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
    }
}

openMenu() {
    this.menuCtrl.open();
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
