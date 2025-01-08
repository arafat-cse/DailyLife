import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KidsVideoRoutingModule } from './kids-video-routing.module';
import { KidsVideoComponent } from './kids-video.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';
import { DeleteComponent } from './delete/delete.component';


@NgModule({
  declarations: [
    KidsVideoComponent,
    AddComponent,
    EditComponent,
    ViewComponent,
    DeleteComponent
  ],
  imports: [
    CommonModule,
    KidsVideoRoutingModule
  ]
})
export class KidsVideoModule { }
