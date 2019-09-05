import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/guard/auth.guard';


const routes: Routes = [
  { path: 'login', loadChildren: './components/login/login.module#LoginModule' },
  { path: '', canActivate: [ AuthGuard ], loadChildren: './components/landing-page/landing-page.module#LandingPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
