import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GlassesRoutingModule } from './glasses-routing.module';
import { GlassesComponent } from './glasses.component';
import { NewComponent } from './new/new.component';


@NgModule({
  declarations: [GlassesComponent, NewComponent],
  imports: [
    CommonModule,
    GlassesRoutingModule
  ]
})
export class GlassesModule { }
