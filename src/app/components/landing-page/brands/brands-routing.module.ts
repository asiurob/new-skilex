import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrandsComponent } from './brands.component';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';


const routes: Routes = [
  { path: ':page', component: BrandsComponent },
  { path: 'new/:page', component: NewComponent },
  { path: 'edit/:name/:page', component: EditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandsRoutingModule { }
