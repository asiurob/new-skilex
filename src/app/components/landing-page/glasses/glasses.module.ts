import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GlassesRoutingModule } from './glasses-routing.module';
import { GlassesComponent } from './glasses.component';
import { NewComponent } from './new/new.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [GlassesComponent, NewComponent, EditComponent],
  imports: [
    CommonModule,
    GlassesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class GlassesModule { }
