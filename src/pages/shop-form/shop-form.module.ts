import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShopFormPage } from './shop-form';

@NgModule({
  declarations: [
    ShopFormPage,
  ],
  imports: [
    IonicPageModule.forChild(ShopFormPage),
  ],
})
export class ShopFormPageModule {}
