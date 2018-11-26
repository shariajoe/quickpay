import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { ToastController } from 'ionic-angular';
import { GenProvider } from '../../providers/gen/gen';
import { MenuProvider } from '../../providers/menu/menu';

@IonicPage({

})

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    data:any = {};
signin: boolean = true;

constructor(
    public modalCtrl: ModalController,
    public navCtrl: NavController, 
    public http: HttpClient , 
    private toastCtrl: ToastController,
    public navParams: NavParams,
    public prov: GenProvider,
    public menuProvider:MenuProvider
) {
    if(localStorage.getItem('user')){
        this.navCtrl.setRoot('DashboardPage');
    }
}

openPage(page) {
    if(page === "DashboardPage"){
        this.menuProvider.activePage = "Home";
        this.navCtrl.setRoot(page);
    }
    else{
        this.navCtrl.setRoot(page);
    }
}

signup_page(){
    this.signin = false;
}

signin_page(){
    this.signin = true;
}

signup()
{

    var myData = JSON.stringify({
        email: this.data.email , 
        password: this.data.password, password2: 
        this.data.password2 , 
        phone: this.data.phone,
        names:this.data.names
    });
    var signup=this.prov.php+'process_signup.php';

    this.http.post(signup, myData)
        .subscribe(data => {
        let res = data; 
        console.log(res);

        if( res['error'] )
        {
            let toast = this.toastCtrl.create({
                message: res['error_msg'],
                duration: 5000,
                position: 'bottom'
            });
            toast.present();
        }
        else
        {
            localStorage.setItem("user", JSON.stringify(res));
            location.reload();
            //this.navCtrl.setRoot('DashboardPage');
        }
    }, error => {
        console.log(error);
    });
}

login()
{    
    var myData = JSON.stringify(
        {
            email: this.data.email , 
            password: this.data.password 
        });
    var signin=this.prov.php+'process_signin.php';

    this.http.post(signin, myData)
        .subscribe(data => {
        let res = data; 
        console.log(res);

        if( res['error'] )
        {
            let toast = this.toastCtrl.create({
                message: res['error_msg'],
                duration: 5000,
                position: 'bottom'
            });
            toast.present();
        }
        else
        {
            localStorage.setItem("user", JSON.stringify(res));
            location.reload();
            //this.navCtrl.setRoot('DashboardPage');
        }
    }, error => {
        console.log(error);
    });

}

}
