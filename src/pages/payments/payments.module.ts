import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentsPage } from './payments';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
    declarations: [
        PaymentsPage,
    ],
    imports: [
        IonicPageModule.forChild(PaymentsPage),
        DataTablesModule
    ],
})
export class PaymentsPageModule {}
