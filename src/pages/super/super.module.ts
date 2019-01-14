import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SuperPage } from './super';

@NgModule({
  declarations: [
    SuperPage,
  ],
  imports: [
    IonicPageModule.forChild(SuperPage),
  ],
})
export class SuperPageModule {}
