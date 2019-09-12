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
      { path: 'me', loadChildren: './me/me.module#MeModule' },
      { path: 'glasses', loadChildren: './glasses/glasses.module#GlassesModule' },
      { path: 'glass-brands', loadChildren: './brands/brands.module#BrandsModule' },
      { path: 'glass-models', loadChildren: './bmodels/models.module#ModelsModule' },

    ]
   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingPageRoutingModule { }
