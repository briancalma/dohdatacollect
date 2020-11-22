import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'about', loadChildren: './pages/about/about.module#AboutPageModule' },
  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule' },
  { path: 'edit-profile', loadChildren: './pages/edit-profile/edit-profile.module#EditProfilePageModule' },
  { path: 'home-results', loadChildren: './pages/home-results/home-results.module#HomeResultsPageModule' },
  { path: 'facprofile', loadChildren: './pages/facprofile/facprofile.module#FacprofilePageModule' },
  { path: 'facprofile/:id', loadChildren: './pages/facdetails/facdetails.module#FacdetailsPageModule' },
  { path: 'inventoryrpt', loadChildren: './pages/inventoryrpt/inventoryrpt.module#InventoryrptPageModule' },
  { path: 'mysamplepage', loadChildren: './pages/mysamplepage/mysamplepage.module#MysamplepagePageModule' },
  { path: 'mymainpage', loadChildren: './pages/mymainpage/mymainpage.module#MymainpagePageModule' },
//  { path: 'mydetailsmodal', loadChildren: './pages/modal/mydetailsmodal/mydetailsmodal.module#MydetailsmodalPageModule' },
 // { path: 'mysamplemodal', loadChildren: './pages/modal/mysamplemodal/mysamplemodal.module#MysamplemodalPageModule' },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
