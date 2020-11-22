import { Component } from '@angular/core';

import { Platform, NavController,ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Pages } from './interfaces/pages';
import { InventoryapiService } from './services/inventoryapi.service';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public appPages: Array<Pages>;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    
    private storage: Storage,
    public navCtrl: NavController,
    public inventoryapi: InventoryapiService,
    public toastCtrl: ToastController,
  ) {
    this.appPages = [
      {
        title: 'Home',
        url: '/home-results',
        direct: 'root',
        icon: 'home'
      },
      {
        title: 'About',
        url: '/about',
        direct: 'forward',
        icon: 'information-circle-outline'
      },
      
      {
        title: 'Region List',
        url: '/mymainpage',
        direct: 'forward',
        icon: 'cog'
      }
    ];

    this.initializeApp();
  }

  initializeApp() {
  /*
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    }).catch(() => {});
  */
 this.platform.ready().then(() => {
  this.statusBar.styleDefault();
  this.splashScreen.hide();
});

this.storage.get('session_storage').then((res)=>{
  if(res == null){
    this.navCtrl.navigateForward('/');
    console.log(res);
  }else{
    this.navCtrl.navigateForward('/home-results');
    this.inventoryapi.myuser=res;
    console.log(res);
  }
});
  
  }

  goToEditProfile() {
    this.navCtrl.navigateForward('edit-profile');
  }

  async logout() {
    /*
    this.navCtrl.navigateRoot('/');
    */
   this.storage.clear();
   this.navCtrl.navigateRoot('/');
   const toast = await this.toastCtrl.create({
       message: 'logout succesful',
       duration: 3000
     });
   toast.present();
  }


}
