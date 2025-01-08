import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KidsVideoRoutingModule } from './kids-video-routing.module';
import { KidsVideoComponent } from './kids-video.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';
import { DeleteComponent } from './delete/delete.component';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatError } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    KidsVideoComponent,
    AddComponent,
    EditComponent,
    ViewComponent,
    DeleteComponent,
  ],
  imports: [
    CommonModule,
    KidsVideoRoutingModule,
    MatCardModule
  ]
})
export class KidsVideoModule { }
