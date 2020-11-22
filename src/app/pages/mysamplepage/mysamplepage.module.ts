import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MysamplepagePage } from './mysamplepage.page';

const routes: Routes = [
  {
    path: '',
    component: MysamplepagePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MysamplepagePage]
})
export class MysamplepagePageModule {}
