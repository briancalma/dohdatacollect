import { Component, OnInit } from '@angular/core';


import { ProfileapiService, Dev } from './../../services/profileapi.service';
//import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-facdetails',
  templateUrl: './facdetails.page.html',
  styleUrls: ['./facdetails.page.scss'],
})
export class FacdetailsPage implements OnInit {
  developer: Dev = null;
  skills = '';
  constructor(	private route: ActivatedRoute, 
  				private db: ProfileapiService, 
  				private router: Router, 
  				private toast: ToastController) { }

  /*ngOnInit() {
  }*/

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let devId = params.get('id');
 
      this.db.getDeveloper(devId).then(data => {
        this.developer = data;
        this.skills = this.developer.skills.join(',');
      });
    });
  }
 
  delete() {
    this.db.deleteDeveloper(this.developer.id).then(() => {
      this.router.navigateByUrl('/');
    });
  }
 
  updateDeveloper() {
    let skills = this.skills.split(',');
    skills = skills.map(skill => skill.trim());
    this.developer.skills = skills;
 
    this.db.updateDeveloper(this.developer).then(async (res) => {
      let toast = await this.toast.create({
        message: 'Developer updated',
        duration: 3000
      });
      toast.present();
    });
  }

}
