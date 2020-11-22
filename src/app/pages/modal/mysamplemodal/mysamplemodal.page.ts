
import { Component, Input, OnInit } from '@angular/core';
import { ModalController,
		LoadingController,
		ToastController } from '@ionic/angular';

import { InventoryapiService } from './../../../services/inventoryapi.service';

@Component({
  selector: 'app-mysamplemodal',
  templateUrl: './mysamplemodal.page.html',
  styleUrls: ['./mysamplemodal.page.scss'],
})
export class MysamplemodalPage implements OnInit {
  @Input() data: any;

  
  mydate='';
  
  tempdata=[{
  	userid: this.inventoryapi.myuser.userid,
	ms1: "",
	ms2: "",
	ms3: "",
	ms4: "",
	ms5: "",
	ms6: "",
	reportdate: ''+ this.inventoryapi.currentdate()
  }];

  
  constructor(
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public loadingController: LoadingController,
    public inventoryapi: InventoryapiService
  ) {




  }

  ngOnInit() {
   this.mydate=''+ this.inventoryapi.currentdate();
   console.log(this.mydate);
  }

  ionViewWillEnter() {
		console.log(this.data);
  }

  closeModal() {
   		this.modalCtrl.dismiss({
			data: this.tempdata
		});
  }


  submitdata() {
   	console.log(this.tempdata[0]);
   	this.inventoryadd(this.tempdata[0]);
  }


  async inventoryadd(tempdata){
    const loading = await this.loadingController.create({
    message: 'Loading',
  });
    await loading.present();
    loading.dismiss();
    
    //API for Submiting data here

    this.mytoast("DATA SUBMITTED");
    this.closeModal();

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

