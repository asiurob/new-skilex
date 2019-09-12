import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MeRoutingModule } from './me-routing.module';
import { MeComponent } from './me.component';


@NgModule({
  declarations: [MeComponent],
  imports: [
    CommonModule,
    MeRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class MeModule { }
