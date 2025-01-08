import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KidsVideoComponent } from './kids-video.component';

const routes: Routes = [{ path: '', component: KidsVideoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KidsVideoRoutingModule { }
