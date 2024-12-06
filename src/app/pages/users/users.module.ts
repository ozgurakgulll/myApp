import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UsersPage} from "./users.page";
import {IonicModule} from "@ionic/angular";
import {RouterLink} from "@angular/router";
import {UsersRoutingModule} from "./users-routing.module";
@NgModule({
  declarations: [UsersPage],
  imports: [
    CommonModule,
    IonicModule,
    RouterLink,UsersRoutingModule
  ]
})
export class UsersModule { }
