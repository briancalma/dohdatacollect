import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventoryapiService } from './../../services/inventoryapi.service';


import { ActivatedRoute } from '@angular/router';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})

export class EditProfilePage implements OnInit {

public form : FormGroup;
  public region;
  public province;
  public city;
  public bgy;

  public info:any;
  public status: true;

setdataCnt: any;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public fb : FormBuilder,
    public api: InventoryapiService,
    private storage: Storage,
    public activatedRoute : ActivatedRoute
    ) { 
//this.getRegion();


 this.activatedRoute.queryParams.subscribe((res)=>{
                  console.log(res);
              });
  }

  async getData() {
  const loading = await this.loadingCtrl.create({
    message: 'Loading'
  });
  await loading.present();
  loading.dismiss();
  }


  ngOnInit() {
  this.info=this.api.myuser;
  //this.getData();


  this.form = this.fb.group({
     "userid": [this.api.myuser.userid], /*
      'userpass': [null, Validators.compose([
        Validators.required
      ])],*/
      /*"regcode"  :   [""],
      "provcode"  :   [""],
      "citycode"  :   [""],
      "bgycode"  :   [""],*/
      "cfname"  :  [this.api.myuser.cfname,Validators.required],
      "clname"  :  [this.api.myuser.clname,Validators.required],
      "mobileno"  :  [this.api.myuser.mobileno],
      "telno"  :  [this.api.myuser.telno],
      "emailadd"  :  [this.api.myuser.emailadd],
      "ofc_code"  :  [this.api.myuser.ofc_code],
      "postitle"  :  [this.api.myuser.postitle]
    });
   this.form.valueChanges.subscribe(data => 
     this.onStudentFormValueChange(data));

  }



ionViewWillEnter(){
 this.setdataCnt=0;
/*
    setTimeout(() => {
    this.getRegion();
    this.getProvince();
    this.getCity();
    this.getBgy();
  });*/
}


ionViewDidEnter(){
   /* setTimeout(() => {
      this.form.controls['regcode'].setValue(this.info.regcode);
      this.form.controls['provcode'].setValue(this.info.provcode);
      this.form.controls['citycode'].setValue(this.info.citycode);
      this.form.controls['bgycode'].setValue(this.info.bgycode);
  },200);*/
}

 private onStudentFormValueChange(data) {
   console.log(data.provcode);
   /*
   if(data.regcode!=""){
    this.api.initProvince(data.regcode);
   }
   if(data.provcode!=""){
    this.api.initCity(data.provcode);
   }
   if(data.citycode!=""){
    this.api.initBarangay(data.citycode);
   }
  */
    
    
    
   // this.info.clname = data.cfname;

   //console.log(this.form.controls['clname']);
    // or
   /* for (const key in this.form.controls) {
       const control = this.form.get(key);
       this.selectedStudent[key] = control.value
    }*/
}



  async sendData(data) {
    console.log(data);
    let message:any;
   const loader = await this.loadingCtrl.create({
      message: 'Sending'
    });
     await loader.present();
      this.api.updateuser(data)
      .subscribe(res => {
      console.log(res);
      message="Your Data was Edited!";
      loader.dismiss();
      //this.navCtrl.navigateForward('/home-results');
      this.logout();
      }, err => {
        console.log(err);
        message="Edit Failed!";
        loader.dismiss();
      });

      loader.onWillDismiss().then(async l => {
      const toast = await this.toastCtrl.create({
        showCloseButton: true,
        cssClass: 'bg-profile',
        message: message,
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
      
      });

/*    const loader = await this.loadingCtrl.create({
      duration: 2000
    });
    loader.present();
    loader.onWillDismiss().then(async l => {
      const toast = await this.toastCtrl.create({
        showCloseButton: true,
        cssClass: 'bg-profile',
        message: 'Your Data was Edited!',
        duration: 3000,
        position: 'bottom'
      });

      toast.present();
      this.navCtrl.navigateForward('/');
    });
    */
  }


    async postdata(data){
  
    const loading = await this.loadingCtrl.create({
    message: 'Loading'
    });
    await loading.present();
    this.api.updateuser(data)
      .subscribe(res => {
        console.log(res);
        this.navCtrl.navigateRoot('/');
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
    }

/*
   public resetprov(data){
     this.api.getProvince(data)
      .subscribe(res => {
    this.province= res[0];
      }, err => {
        console.log(err);
      });
      this.form.controls['provcode'].setValue("");
    }

    public resetcity(data){
     this.api.getCity(data)
      .subscribe(res => {
    this.city= res[0];
      }, err => {
        console.log(err);
      });
      this.form.controls['citycode'].setValue("");
    }

    public resetbgy(data){
     this.api.getBarangay(data)
      .subscribe(res => {
    this.bgy= res[0];
      }, err => {
        console.log(err);
      });
      this.form.controls['bgycode'].setValue("");
    }


    async getRegion() {
   const loading = await this.loadingCtrl.create({
    message: 'Loading',
    duration: 5000
    });
    await loading.present();
    this.api.getRegion()
      .subscribe(res => {
    this.region= res[0];
        loading.dismiss();
        this.setData();
      }, err => {
        console.log(err);
        loading.dismiss();
      });

    }
  async getProvince() {
   const loading = await this.loadingCtrl.create({
    message: 'Loading',
    duration: 5000
    });
    await loading.present();
    this.api.getProvince(this.info.regcode)
      .subscribe(res => {
    this.province= res[0];
        loading.dismiss();
        this.setData();
      }, err => {
        console.log(err);
        loading.dismiss();
      });

    }

  async getCity() {
   const loading = await this.loadingCtrl.create({
    message: 'Loading',
    duration: 5000
    });
    await loading.present();
    this.api.getCity(this.info.provcode)
      .subscribe(res => {
    this.city= res[0];
        loading.dismiss();
        this.setData();
      }, err => {
        console.log(err);
        loading.dismiss();
      });

    }

  async getBgy() {
   const loading = await this.loadingCtrl.create({
    message: 'Loading',
    duration: 5000
    });
    await loading.present();
    this.api.getBarangay(this.info.citycode)
      .subscribe(res => {
    this.bgy= res[0];
        loading.dismiss();
        this.setData();
      }, err => {
        console.log(err);
        loading.dismiss();
      });

    }
*/

   /*   async setData(){

  this.setdataCnt += 1;
  console.log(this.setdataCnt);
  if(this.setdataCnt==4){
   const loading = await this.loadingCtrl.create({
    message: 'Set Administrative Region',
    duration: 3000
    });
    await loading.present();
    setTimeout(() => {
      this.form.controls['regcode'].setValue(this.info.regcode);
      this.form.controls['provcode'].setValue(this.info.provcode);
      this.form.controls['citycode'].setValue(this.info.citycode);
      this.form.controls['bgycode'].setValue(this.info.bgycode);
        loading.dismiss();
     },1500);*/
    /*setTimeout(() => {
  },1500);*/
/*
  }


  }*/

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
