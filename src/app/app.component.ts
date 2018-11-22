import { Component, ViewChild } from '@angular/core';
import { Nav, Platform , MenuController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MenuProvider } from '../providers/menu/menu';
 
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  
  rootPage: any = "HomePage";

  pages: Array<{title: string, component: any, image: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, 
    public menuCtrl: MenuController, public menuProvider: MenuProvider) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: "DashboardPage", image:"assets/imgs/house.png"},
      { title: 'Car Care', component: "CarCarePage", image:"assets/imgs/car.png" },
      { title: 'CarpetKlin', component: "CarpetKlinPage", image:"assets/imgs/carpet.png" },
      { title: 'Swift Water', component: "WaterPage", image:"assets/imgs/water.png" }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.menuProvider.activePage = page.title;
    localStorage.setItem("activePage",page.title);
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  openNonMenuPage(page) {
    if(page === "HomePage"){
      this.menuProvider.activePage = "";
      this.nav.setRoot(page);
    }
    else{
      this.nav.setRoot(page);
    }
  }

  onChangeActive(page){
    this.menuProvider.activePage = page;
  }
}
