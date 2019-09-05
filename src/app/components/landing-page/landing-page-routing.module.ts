import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page.component';


const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    children: [
      { path: 'employees', loadChildren: './employees/employees.module#EmployeesModule' },
      { path: 'departments', loadChildren: './departments/departments.module#DepartmentsModule' },

    ]
   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingPageRoutingModule { }
