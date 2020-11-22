import { Component, Input, OnInit } from '@angular/core';
import { NavController, 
		ModalController,

		LoadingController,
		ToastController } from '@ionic/angular';

import { DomSanitizer } from '@angular/platform-browser';

import { InventoryapiService } from './../../../services/inventoryapi.service';

@Component({
  selector: 'app-inventoryview',
  templateUrl: './inventoryview.page.html',
  styleUrls: ['./inventoryview.page.scss'],
})
export class InventoryviewPage implements OnInit {
  @Input() data: any;
  @Input() mode: any;

  mydate='';
  tempdata=[{
  	userid: "",
	ms1: "",
	ms2: "",
	ms3: "",
	ms4: "",
	ms5: "",
	ms6: "",
	reportdate: ''+ this.inventoryapi.currentdate(),
	addedby: "",
	addeddate: "",
	updatedby: "",
	updateddate: ""
  }];
  tempmode:any;
  constructor(
    private nav: NavController,
    private modalCtrl: ModalController,
    private sanitizer: DomSanitizer,

    public toastCtrl: ToastController,
    public loadingController: LoadingController,
    public inventoryapi: InventoryapiService
  ) {}

  ngOnInit() {
   this.mydate=''+ this.inventoryapi.currentdate();
   console.log(this.mydate);
  }

  ionViewWillEnter() {
  	console.log(this.data);
  	console.log(this.mode);

	

  	if(this.data)
  	{
  	this.tempdata=this.data;
  	this.tempmode=1;
  	}
  	else
  	{
	this.tempmode=0;
  	}

  }

  closeModal() {
   // this.modalCtrl.dismiss();
   		this.modalCtrl.dismiss({
			data: this.data
		});
  }


  addreport() {
   // this.modalCtrl.dismiss();
   	
   	console.log(this.tempdata[0]);
   	this.inventoryadd(this.tempdata[0]);

   	/*	this.modalCtrl.dismiss({
			data: this.data
		});
	*/
  }

  editreport() {
   // this.modalCtrl.dismiss();

   console.log(this.tempdata);
   	this.inventoryedit(this.tempdata);
   	/*	this.modalCtrl.dismiss({
			data: this.data
		});
	*/
  }


  async inventoryadd(tempdata){
    const loading = await this.loadingController.create({
    message: 'Loading'
  });
    await loading.present();
    this.inventoryapi.inventoryadd(tempdata)
      .subscribe(data => {
        console.log(data);

        loading.dismiss();
        this.mytoast(data[0]['status_message']);
        this.closeModal();

      }, err => {
        console.log(err);
        loading.dismiss();
        this.closeModal();
      }); 
    }

  async inventoryedit(tempdata){
    const loading = await this.loadingController.create({
    message: 'Loading'
  });
    await loading.present();
    this.inventoryapi.inventoryedit(tempdata)
      .subscribe(data => {
        console.log(data);

        loading.dismiss();
        this.mytoast(data[0]['status_message']);
        this.closeModal();
      }, err => {
        console.log(err);
        loading.dismiss();
        this.closeModal();
      }); 
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
