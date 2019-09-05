import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentsRoutingModule } from './departments-routing.module';
import { DepartmentsComponent } from './departments.component';
import { NewComponent } from './new/new.component';
import { LoaderComponent } from '../../loader/loader.component';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [DepartmentsComponent, NewComponent, EditComponent],
  imports: [
    CommonModule,
    DepartmentsRoutingModule,
  ]
})
export class DepartmentsModule { }
