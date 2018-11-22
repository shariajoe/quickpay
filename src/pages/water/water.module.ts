import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WaterPage } from './water';

@NgModule({
  declarations: [
    WaterPage,
  ],
  imports: [
    IonicPageModule.forChild(WaterPage),
  ],
})
export class WaterPageModule {}
