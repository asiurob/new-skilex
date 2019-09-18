import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompaniesRoutingModule } from './companies-routing.module';
import { CompaniesComponent } from './companies.component';
import { NewComponent } from './new/new.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [CompaniesComponent, NewComponent, EditComponent],
  imports: [
    CommonModule,
    CompaniesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CompaniesModule { }
