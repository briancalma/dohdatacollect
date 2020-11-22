import { Component, Input, OnInit } from '@angular/core';
import { NavController, 
		ModalController,
		LoadingController,
		ToastController } from '@ionic/angular';

import { ReferenceService } from './../../../services/reference.service';

@Component({
  selector: 'app-mydetailsmodal',
  templateUrl: './mydetailsmodal.page.html',
  styleUrls: ['./mydetailsmodal.page.scss'],
})
export class MydetailsmodalPage implements OnInit {
  @Input() data: any;


  public statusoption=[{
      name:'Active',
      value:'A'
    },{
      name:'Inactive',
      value:'I'
    }];
  mydate='';
  tempdata=[{
  	regcode: "",
  	regname: "",
	regdesc: "",
	regpop: "",
	userid: "",
	dateupdated: "",
	status: ""
  }];
  tempmode:any;
  constructor(
    private nav: NavController,
    private modalCtrl: ModalController,

    public toastCtrl: ToastController,
    public loadingController: LoadingController,
    public referenceapi: ReferenceService
  ) {}

  ngOnInit() {
   this.mydate=''+ this.referenceapi.currentdate();
   console.log(this.mydate);
  }

  ionViewWillEnter() {
   console.log(this.data);
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
   		this.modalCtrl.dismiss({
			data: this.data
		});
  }


  addreport() {
   	console.log(this.tempdata[0]);
   	this.regionadd(this.tempdata[0]);
  }

  editreport() {

   console.log(this.tempdata);
   	this.redgionedit(this.tempdata);
  }


  async regionadd(tempdata){
    const loading = await this.loadingController.create({
    message: 'Loading'
  });
    await loading.present();
    this.referenceapi.regionadd(tempdata)
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

  async redgionedit(tempdata){
    const loading = await this.loadingController.create({
    message: 'Loading'
  });
    await loading.present();
    this.referenceapi.regionedit(tempdata)
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
