import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { NewComponent } from './new/new.component';
import { UpdateComponent } from './update/update.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  {path: '', pathMatch:'full', component:ListComponent},
  {path: 'list', component:ListComponent},
  {path: 'new', component:NewComponent},
  {path: 'update/:id', component:UpdateComponent},
  {path: 'details/:id', component:DetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
