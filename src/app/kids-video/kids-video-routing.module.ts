import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KidsVideoComponent } from './kids-video.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';
import { DeleteComponent } from './delete/delete.component';

const routes: Routes = [
  { path: '', component: KidsVideoComponent },
  { path: 'add', component: AddComponent },
  { path: 'edit', component: EditComponent },
  { path: 'view', component: ViewComponent },
  { path: 'delete/:id', component: DeleteComponent },
  // { path: 'video-list', component: DeleteComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KidsVideoRoutingModule { }
