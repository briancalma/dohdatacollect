import { Component, OnInit } from '@angular/core';


import { ProfileapiService, Dev } from './../../services/profileapi.service';
//import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-facprofile',
  templateUrl: './facprofile.page.html',
  styleUrls: ['./facprofile.page.scss'],
})
export class FacprofilePage implements OnInit {
  developers: Dev[] = [];
 
  products: Observable<any[]>;
 
  developer = {};
  product = {};
 
  selectedView = 'pg1';
  pgnum=1;
  pages: string = "pageA";

  constructor(private db: ProfileapiService) { }

 ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getDevs().subscribe(devs => {
          this.developers = devs;
        })
        this.products = this.db.getProducts();
      }
    });
  }
 
  addDeveloper() {
    let skills = this.developer['skills'].split(',');
    skills = skills.map(skill => skill.trim());
 
    this.db.addDeveloper(this.developer['name'], skills, this.developer['img'])
    .then(_ => {
      this.developer = {};
    });
  }
 
  addProduct() {
    this.db.addProduct(this.product['name'], this.product['creator'])
    .then(_ => {
      this.product = {};
    });
  }


  swipeEvent($e) {

    console.log($e.deltaX+", "+$e.deltaY);
    if($e.deltaX > 100){
      console.log("Swipe from Left to Right");
      
      	if(this.pgnum>1)
      	{
      		this.pgnum-=1;
      		this.selectedView = "pg"+this.pgnum;		
      	}
    }
	else if($e.deltaX < -100){
      console.log("Swipe from Left to Right");
      
      	if(this.pgnum<7)
      	{
      		this.pgnum+=1;
      		this.selectedView = "pg"+this.pgnum;		
      	}
      
    }
    else{
     // console.log("Swipe from Right to Left");
     // this.selectedView = "o2";
    }
    console.log($e);
    console.log(this.selectedView);
	}

	logScrolling($event)
	{
	console.log($event);
	}

}
