import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-account',
    templateUrl: 'account.html',
})
export class AccountPage {

    isPasswordForm: boolean = true;
user: any = {};

constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController) {
}

ionViewDidLoad() {
    if(localStorage.getItem('user')){
        this.user=JSON.parse(localStorage.getItem('user'));       
        console.log(this.user);
    }
}

openMenu() {
    this.menuCtrl.open();
}

openPage(page){ 	
    console.log("test");
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

}
