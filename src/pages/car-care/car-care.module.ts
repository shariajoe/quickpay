import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarCarePage } from './car-care';

@NgModule({
  declarations: [
    CarCarePage,
  ],
  imports: [
    IonicPageModule.forChild(CarCarePage),
  ],
})
export class CarCarePageModule {}
