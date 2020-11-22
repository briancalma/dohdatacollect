import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InventoryrptPage } from './inventoryrpt.page';

const routes: Routes = [
  {
    path: '',
    component: InventoryrptPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InventoryrptPage]
})
export class InventoryrptPageModule {}
