import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { InventoryapiService } from './../../services/inventoryapi.service';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public onLoginForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,

    private storage: Storage,
    private inventoryapi:InventoryapiService
  ) { }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {

    this.onLoginForm = this.formBuilder.group({
      'userid': [null, Validators.compose([
        Validators.required
      ])],
      'userpass': [null, Validators.compose([
        Validators.required
      ])]
    });
  }

  // // //
  goToRegister() {
    this.navCtrl.navigateRoot('/register');
  }

  goToHome(data) {
    //this.navCtrl.navigateRoot('/home-results');
    this.postdata(data);
  }

  goToProfile() {
    //this.navCtrl.navigateRoot('/home-results');
    this.navCtrl.navigateForward('/facprofile');
  
  }

   async postdata(data){
    let modulelist=[];
   console.log(data);
    const loading = await this.loadingCtrl.create({
    message: 'Loading'
    });
    await loading.present();
    this.inventoryapi.authuser(data)
      .subscribe(res => {
        

        if (res[0][0].usercnt=='1')
        {
        this.inventoryapi.myuser = res[0][0];
        console.log(this.inventoryapi.myuser)
        console.log(this.inventoryapi.myuser['mobileuserlevel']);

         if(this.inventoryapi.myuser['mobileuserlevel']=='10' || this.inventoryapi.myuser['mobileuserlevel']=='31')
         {
                this.storage.set('session_storage', this.inventoryapi.myuser);
                this.navCtrl.navigateRoot('/home-results');
                loading.dismiss();
         }  
         else{
          this.loginfail('Userlevel Unauthorized');   
          loading.dismiss();
         }


        }
        else{
        this.loginfail('Wrong Username or Password');
          loading.dismiss();
        }

      }, err => {
        console.log(err);
        this.loginfail('Could Not Connect to Server');
        loading.dismiss();
      });


    }

  async loginfail(messages) {
    const alert = await this.alertCtrl.create({
      header: 'Message',
      message: messages,
      buttons: [
        {
          text: 'Ok',
          handler: data => {
            console.log('Ok clicked');
          }
        }
      ]
    });
    alert.present();
  }

}
