import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  
  rootPage: any = "HomePage";

  pages: Array<{title: string, component: any, image: string}>;
  activePage: string = "Home"

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
    this.activePage = localStorage.getItem("activePage")?localStorage.getItem("activePage"):"Home";
    if(this.activePage === "Car Care"){
      this.rootPage = "CarCarePage"
    }

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: "HomePage", image:"assets/imgs/house.png"},
      { title: 'Car Care', component: "CarCarePage", image:"assets/imgs/car.png" },
      { title: 'CarpetKlin', component: "CarpetKlinPage", image:"assets/imgs/carpet.png" },
      { title: 'Garbage Kollect', component: "HomePage", image:"assets/imgs/garbage.png" }
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
    this.activePage = page.title;
    localStorage.setItem("activePage",page.title);
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  onChangeActive(page){
    this.activePage = page;
  }
}
