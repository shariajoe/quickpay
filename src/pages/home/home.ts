import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { MenuProvider } from '../../providers/menu/menu';
import { Camera, CameraOptions } from '@ionic-native/camera';


@IonicPage({
  
})

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  objectblock:any = {};
  firstPage: boolean = true;



  constructor(public navCtrl: NavController, public menuProvider:MenuProvider, private camera: Camera) {

  }

  openPage(page) {
  	if(page === "DashboardPage"){
  		this.menuProvider.activePage = "Home";
  		this.navCtrl.setRoot(page);
  	}
  	else{
	    this.navCtrl.setRoot(page);
	}
  }

  goNext(){
  	this.firstPage = false;
  }

  openCam(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     let base64Image = 'data:image/jpeg;base64,' + imageData;
     console.log(base64Image);
     alert("done");
    }, (err) => {
     // Handle error
    });

  }

}
