import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsersPage} from "./users.page";

const routes: Routes = [
  {
    path: '',
    component:UsersPage

  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
