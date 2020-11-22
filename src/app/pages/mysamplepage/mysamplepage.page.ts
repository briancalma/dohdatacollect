import { Component, OnInit } from '@angular/core';
import {
  NavController,
  AlertController,
  ToastController,
  ModalController,
  LoadingController } from '@ionic/angular';

//use for accepting data
import { ActivatedRoute, Router } from '@angular/router';

import { MysamplemodalPage } from '../../pages/modal/mysamplemodal/mysamplemodal.page';
//import { MysampleserviceService } from './../../services/mysampleservice.service';

@Component({
  selector: 'app-mysamplepage',
  templateUrl: './mysamplepage.page.html',
  styleUrls: ['./mysamplepage.page.scss'],
})
export class MysamplepagePage implements OnInit {
//Variable declarations

public name: string;
public age: number;


//for checklist variables
public myboolean=false;
public checklist = [
      { val: 'Pepperoni', isChecked: true },
      { val: 'Sausage', isChecked: false },
      { val: 'Mushroom', isChecked: false }
    ];
//for date
  customYearValues = [2020, 2016, 2008, 2004, 2000, 1996];
  customDayShortNames = ['s\u00f8n', 'man', 'tir', 'ons', 'tor', 'fre', 'l\u00f8r'];
  customPickerOptions: any;



  users: any[] = [
    {
      id: 1,
      first: 'Alice',
      last: 'Smith',
    },
    {
      id: 2,
      first: 'Bob',
      last: 'Davis',
    },
    {
      id: 3,
      first: 'Charlie',
      last: 'Rosenburg',
    }
  ];

  selecteduser:any;
  toppings:any;


rangeval:any;
rangeval2:any;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public loadingController: LoadingController,
    public modalCtrl: ModalController,
//    public mysampleservice: MysampleserviceService,

//declare variable for ActivatedRoute  
  	public activatedRoute : ActivatedRoute,
  	public router:Router) {
//accepting getting data by activatedRoute

    	this.activatedRoute.queryParams.subscribe((res)=>{
        console.log(res);
    	});

//accepting getting data by router.getCurrentNavigation().extras.queryParams    
    	
    	console.log(this.router.getCurrentNavigation().extras.queryParams.mydata);

    	console.log(this.router.getCurrentNavigation().extras.queryParams.mygender[0]);



	    this.customPickerOptions = {
	      buttons: [{
	        text: 'Save',
	        handler: () => console.log('Clicked Save!')
	      }, {
	        text: 'Log',
	        handler: () => {
	          console.log('Clicked Log. Do not Dismiss.');
	          return false;
	        }
	      }]
	    }




  }

  ngOnInit() {

  }

  ionViewWillEnter() {

  }

async displayalert() {
    const changeLocation = await this.alertCtrl.create({
      header: 'Sample Header',
      message: 'My Message',
      inputs: [
        {
          name: 'name',
          placeholder: 'Enter Name',
          type: 'text'
        },
        {
          name: 'age',
          placeholder: 'Enter last name',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Submit',

          handler: async (data) => {


          	//CODE FOR GETTING DATA USING SERVICE CAN BE USED HERE
            console.log('Change clicked', data);
            this.name = data.name;
            this.age = data.age;
            this.displaytoast(this.name,this.age);
          }
        }
      ]
    });
    changeLocation.present();
  }



async displaytoast(name, age)
{
	const toast = await this.toastCtrl.create({
              message: 'Name: '+name+' Age: '+age,
              duration: 3000,
              position: 'bottom',
              closeButtonText: 'CLOSE',
              showCloseButton: true
            });
            toast.present();
 
}




  async displayloading(){
    const loading = await this.loadingController.create({
    message: 'This is my Loading',
    duration: 2000,
    translucent: true
  });
    await loading.present();
    //CODE FOR GETTING DATA USING SERVICE CAN BE USED HERE

    /*
    this.inventoryapi.inventorydelete(item)
      .subscribe(data => {
        console.log(data);

        loading.dismiss();
        this.mytoast(data[0]['status_message']);
	
      }, err => {
        console.log(err);
        loading.dismiss();
      }); 
      */
    }


  async displaymodal() {
/*
    if(mydata!=undefined)
    {
    if(mydata.reportdate!=this.inventoryapi.currentdate())
    {
      this.mytoast("You can't update/edit this report.");
      return 0;
    }
    }
*/
    let myname={
      firstname:'PATRICK',
      lastname:'DIANGCO'
    };
    const modal = await this.modalCtrl.create({
      component: MysamplemodalPage,
      	componentProps: 
      	{
        data: myname
      	}
    	});

    	modal.onDidDismiss()
        .then((data) => {
        	//execute codes here.
         //console.log(data.data.data[0]);
      });
    return await modal.present();
    }


checkEvent(myboolean)
{
console.log(myboolean);
}

checkEvent2()
{
let checkedvalues="";
 this.checklist.forEach(obj => {
        if(obj.isChecked)
        {
        	if(checkedvalues!="")
        	{
        		checkedvalues+=", "+ obj.val;		
        	}
        	else
        	{
        		checkedvalues+= obj.val;	
        	}
        
        }

      });
console.log(checkedvalues);
}



showselected()
{
console.log(this.selecteduser);
}


showtoppings()
{
console.log(this.toppings);
}

}
