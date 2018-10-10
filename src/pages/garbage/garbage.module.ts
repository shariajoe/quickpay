import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GarbagePage } from './garbage';

@NgModule({
  declarations: [
    GarbagePage,
  ],
  imports: [
    IonicPageModule.forChild(GarbagePage),
  ],
})
export class GarbagePageModule {}
