import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateShopPage } from './create-shop';

@NgModule({
  declarations: [
    CreateShopPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateShopPage),
  ],
})
export class CreateShopPageModule {}
