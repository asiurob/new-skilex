import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GlassesComponent } from './glasses.component';
import { NewComponent } from './new/new.component';


const routes: Routes = [
  { path: '', component: GlassesComponent },
  { path: 'new', component: NewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GlassesRoutingModule { }
