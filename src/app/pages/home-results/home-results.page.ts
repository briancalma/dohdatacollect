import { Component } from '@angular/core';
import {
  NavController,
  AlertController,
  MenuController,
  ToastController,
  PopoverController,
  ModalController,
  LoadingController } from '@ionic/angular';

// Modals
import { SearchFilterPage } from '../../pages/modal/search-filter/search-filter.page';
import { ImagePage } from './../modal/image/image.page';
// Call notifications test by Popover and Custom Component.
import { NotificationsComponent } from './../../components/notifications/notifications.component';


import { InventoryviewPage } from '../../pages/modal/inventoryview/inventoryview.page';
import { InventoryapiService } from './../../services/inventoryapi.service';


import { Router } from '@angular/router';





@Component({
  selector: 'app-home-results',
  templateUrl: './home-results.page.html',
  styleUrls: ['./home-results.page.scss']
})
export class HomeResultsPage {

  inventorylist:any;
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
    public inventoryapi: InventoryapiService,

    private router: Router

  ) {

  }


   ngOnInit() {
   
  }

  ionViewWillEnter() {
    this.limit=0;
    this.inventorylist=[];
    this.getinventorylist();

    this.menuCtrl.enable(true);
    //this.onsearch();
  }

  settings() {
    this.navCtrl.navigateForward('settings');
  }

  async alertLocation() {
    const changeLocation = await this.alertCtrl.create({
      header: 'Change Location',
      message: 'Type your Address.',
      inputs: [
        {
          name: 'location',
          placeholder: 'Enter your new Location',
          type: 'text'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Change',
          handler: async (data) => {
            console.log('Change clicked', data);
            this.yourLocation = data.location;
            const toast = await this.toastCtrl.create({
              message: 'Location was change successfully',
              duration: 3000,
              position: 'top',
              closeButtonText: 'OK',
              showCloseButton: true
            });

            toast.present();
          }
        }
      ]
    });
    changeLocation.present();
  }

/*
  async searchFilter () {
    const modal = await this.modalCtrl.create({
      component: SearchFilterPage
    });
    return await modal.present();
  }

  async presentImage(image: any) {
    const modal = await this.modalCtrl.create({
      component: ImagePage,
      componentProps: { value: image }
    });
    return await modal.present();
  }

  async notifications(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: NotificationsComponent,
      event: ev,
      animated: true,
      showBackdrop: true
    });
    return await popover.present();
  }
*/

  async viewdata(mydata) {
 //   console.log(mydata.reportdate);
 //   console.log(this.inventoryapi.currentdate());
 

 //disables update if the reportdate is not today.
    /*
    if(mydata!=undefined)
    {
    if(mydata.reportdate!=this.inventoryapi.currentdate())
    {
      this.mytoast("You can't update/edit this report.");
      return 0;
    }
    }*/

 
      /*    if(this.api.myuser['mobileuserlevel']!="21"){
      return 0;
    }*/
    const modal = await this.modalCtrl.create({
      component: InventoryviewPage,
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
    this.inventoryapi.inventorydelete(item)
      .subscribe(data => {
        console.log(data);

        loading.dismiss();
        this.mytoast(data[0]['status_message']);

      }, err => {
        console.log(err);
        loading.dismiss();
      }); 
    }


async getinventorylist(){
 let filter={
    "userid":this.inventoryapi.myuser.userid,
    "limit":this.limit
     };

    const loading = await this.loadingController.create({
    message: 'Loading'
  });
    await loading.present();
    this.inventoryapi.getinventoryrpt(filter)
      .subscribe(data => {
        console.log(data);
        for(var i=0; i<data[0].length; i++) {
          this.inventorylist.push(
          {
          userid:data[0][i]['userid'],
          ms1:data[0][i]['ms1'],
          ms2:data[0][i]['ms2'],
          ms3:data[0][i]['ms3'],
          ms4:data[0][i]['ms4'],
          ms5:data[0][i]['ms5'],
          ms6:data[0][i]['ms6'],
          reportdate:data[0][i]['reportdate'],
          addedby:data[0][i]['addedby'],
          addeddate:data[0][i]['addeddate'],
          updatedby:data[0][i]['updatedby'],
          updateddate:data[0][i]['updateddate'],
          })

         }
        console.log(this.inventorylist);
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      }); 
    }


doRefresh(refresher) {
    console.log('Begin async operation', refresher);
  this.onsearch();
     refresher.target.complete();
  }

 onsearch()
{
  this.limit=0;
  this.inventorylist = [];
  this.getinventorylist();
}

doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      this.limit+=10;
      this.getinventorylist();
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





//access samplespages
  gotoMysamplepage() {
    let myname={
      firstname:'PATRICK',
      lastname:'DIANGCO'
    };

    let gender=[{
      name:'Male',
      values:'1'
    },{
      name:'Female',
      values:'2'
    }];

    let x="HELLO WORLD";
    //this.router.navigate(['/mysamplepage'],{ queryParams: {mydata:x} });
    
    this.router.navigate(['/mysamplepage'],{ queryParams: {mydata: myname, mygender: gender } } );
    
    }

   addmynum()
   {
     return (parseInt(this.mynum1) + parseInt(this.mynum2));
   }


}
