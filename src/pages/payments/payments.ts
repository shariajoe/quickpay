import { Component ,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import { GenProvider } from '../../providers/gen/gen';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
    selector: 'page-payments',
    templateUrl: 'payments.html',
})
export class PaymentsPage {

    @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;
dtOptions: DataTables.Settings = {};
dtTrigger: Subject<any> = new Subject();

user: any = {};
payments:any=[];
uid;

constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public prov: GenProvider,
    public http: HttpClient 
) {
}

ionViewDidLoad() {
    this.dtOptions = {
        pagingType: 'full_numbers',
        ordering:false
    };
    this.user=JSON.parse(localStorage.getItem('user')); 
    this.check_user();

}

logout()
{ 
    localStorage.removeItem("user");
    //this.nav.setRoot('HomePage');
    this.navCtrl.setRoot('HomePage');
}

check_user()
{
    let user_type=this.user.user_type;  

    if(user_type=='attendant')
    {
        var link=this.prov.php+'get_shop_for_attendant.php';
        var myData = JSON.stringify(
            {
                uid: this.user.id
            });

        this.http.post(link, myData)
            .subscribe(data => {

            let res= data;
            this.uid=res[0];
            //console.log(this.uid); 
            this.get_payments();

        }, error => {
            console.log(error);
        });


    }else if(user_type=='super_admin' || user_type=='shop_owner')
    {
        this.uid=this.user.id;
        this.get_payments();
    }
}

refresh()
{
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
        this.get_payments();
        //this.dtTrigger.next();
    })
}

get_payments()
{
    var link=this.prov.php+'get_payments.php';
    var myData = JSON.stringify(
        {
            uid: this.uid
        });

    this.http.post(link, myData)
        .subscribe(data => {

        let res= data;
        this.payments=res;
        this.dtTrigger.next();
        //console.log(this.payments);

    }, error => {
        console.log(error);
    });
}

}
