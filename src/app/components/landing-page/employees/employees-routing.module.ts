import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeesComponent } from './employees.component';
import { NewComponent } from './new/new.component';


const routes: Routes = [
  { path: '', component: EmployeesComponent },
  { path: 'new', component: NewComponent },
  { path: '**', component: EmployeesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
