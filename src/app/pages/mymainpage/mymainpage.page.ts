import { Component } from '@angular/core';
import {
  NavController,
  AlertController,
  MenuController,
  ToastController,
  PopoverController,
  ModalController,
  LoadingController } from '@ionic/angular';

import { MydetailsmodalPage } from '../../pages/modal/mydetailsmodal/mydetailsmodal.page';
import { ReferenceService } from './../../services/reference.service';


import { Router } from '@angular/router';





@Component({
  selector: 'app-mymainpage',
  templateUrl: './mymainpage.page.html',
  styleUrls: ['./mymainpage.page.scss']
})
export class MymainpagePage {

  searchtext:string ="";
  regionlist:any;
  limit: any;
  searchKey = '';
  yourLocation = '123 Test Street';
  themeCover = 'assets/img/ionic4-Start-Theme-cover.jpg';

  selectedView = 'pg1';



  public mynum1: any;
  public mynum2: any;
  public mynum3: any;



  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,

    public loadingController: LoadingController,
    public referenceapi: ReferenceService,

    private router: Router

  ) {

  }


   ngOnInit() {
   
  }

  ionViewWillEnter() {
    this.limit=0;
    this.regionlist=[];
    this.getregionlist();

    this.menuCtrl.enable(true);
    //this.onsearch();
  }

  settings() {
    this.navCtrl.navigateForward('settings');
  }


  async viewdata(mydata) {
 
    const modal = await this.modalCtrl.create({
      component: MydetailsmodalPage,
      componentProps: 
      {
        data: mydata
      }
    });

    modal.onDidDismiss()
        .then((data) => {
         this.onsearch();
         console.log(data.data.data);
      });
    return await modal.present();

  }



  async deletedata(item){
    const loading = await this.loadingController.create({
    message: 'Loading'
  });
    await loading.present();
    this.referenceapi.regiondelete(item)
      .subscribe(data => {
        console.log(data);

        loading.dismiss();
        this.mytoast(data[0]['status_message']);

      }, err => {
        console.log(err);
        loading.dismiss();
      }); 
    }


async getregionlist(){
 let filter={
    "searchtext":this.searchtext,
    "limit":this.limit
     };

    const loading = await this.loadingController.create({
    message: 'Loading'
  });
    await loading.present();
    this.referenceapi.regionlist(filter)
      .subscribe(data => {
        console.log(data);
        for(var i=0; i<data[0].length; i++) {
          this.regionlist.push(
          {
          regcode:data[0][i]['regcode'],
          regname:data[0][i]['regname'],
          regdesc:data[0][i]['regdesc'],
          regpop:data[0][i]['regpop'],
          userid:data[0][i]['userid'],
          dateupdated:data[0][i]['dateupdated'],
          status:data[0][i]['status']
          })

         }
        console.log(this.regionlist);
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      }); 
    }

//for refreshing of data
//call onsearch function below
doRefresh(refresher) {
    console.log('Begin async operation', refresher);
  this.onsearch();
     refresher.target.complete();
  }

 onsearch()
{
  this.limit=0;
  this.regionlist = [];
  this.getregionlist();
}

//
doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      this.limit+=10;
      this.getregionlist();
      console.log('Async operation has ended');
      infiniteScroll.target.complete();
    }, 500);
  }

  async mytoast(msg){
  const toast =await this.toastCtrl.create({
  message:msg,
  duration: 2000,
    position: 'bottom'
  });
  toast.present();
   }




}
