import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MysamplemodalPage } from './mysamplemodal.page';

const routes: Routes = [
  {
    path: '',
    component: MysamplemodalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MysamplemodalPage]
})
export class MysamplemodalPageModule {}
