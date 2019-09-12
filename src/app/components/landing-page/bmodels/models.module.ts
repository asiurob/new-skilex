import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModelsRoutingModule } from './models-routing.module';
import { ModelsComponent } from './models.component';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ModelsComponent, NewComponent, EditComponent],
  imports: [
    CommonModule,
    ModelsRoutingModule,
    FormsModule
  ]
})
export class ModelsModule { }
