import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampaignsRoutingModule } from './campaigns-routing.module';
import { CampaignsComponent } from './campaigns.component';
import { NewComponent } from './new/new.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [CampaignsComponent, NewComponent, EditComponent],
  imports: [
    CommonModule,
    CampaignsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CampaignsModule { }
