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

    this.get_payments();

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
            uid: this.user.id
        });

    this.http.post(link, myData)
        .subscribe(data => {

        let res= data;
        this.payments=res;
        this.dtTrigger.next();
        console.log(this.payments);

    }, error => {
        console.log(error);
    });
}

}
